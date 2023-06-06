import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

import { mapIndexToPrompts } from "../../../utils/helpers";
import { UserPrompts } from "../../../utils/types";

const counter = 6;
const initialPromptsData: UserPrompts[] = [...Array(counter)].map(mapIndexToPrompts);

interface IUserProfileContext {
  user: any;
  setUser: (user: any) => void;

  userProfile: any;
  setUserProfile: (userProfile: any) => void;

  allPrompts: any;
  setAllPrompts: (allPrompts: any) => void;

  mixedPrompts: any;
  setMixedPrompts: (mixedPrompts: any) => void;

  previousPromptId: string;
  setPreviousPromptId: (previousPromptId: string) => void;

  userPromptIds: any;
  setUserPromptIds: (userPromptIds: any) => void;

  userPrompts: any;
  setUserPrompts: (userPrompts: any) => void;

  archivedUserPrompts: any;
  setArchivedUserPrompts: (archivedUserPrompts: any) => void;

  allImages: any;
  setAllImages: (allImages: any) => void;

  prompts: any;
  setPrompts: (prompts: any) => void;

  captureId: string;
  setCaptureId: (captureId: string) => void;

  promptAnswer: any;
  setPromptAnswer: (promptAnswer: any) => void;

  matches: any;
  setMatches: (matches: any) => void;

  voteOnboard: boolean;
  setVoteOnboard: (voteOnboard: boolean) => void;
}

export const initialState: IUserProfileContext = {
  user: null,
  setUser: (user: any) => {},

  userProfile: null,
  setUserProfile: (userProfile: any) => {},

  allPrompts: [],
  setAllPrompts: (allPrompts: any) => {},

  mixedPrompts: [],
  setMixedPrompts: (mixedPrompts: any) => {},

  previousPromptId: "",
  setPreviousPromptId: (previousPromptId: string) => {},

  userPromptIds: [],
  setUserPromptIds: (userPromptIds: any) => {},

  userPrompts: initialPromptsData,
  setUserPrompts: (userPrompts: any) => {},

  archivedUserPrompts: [],
  setArchivedUserPrompts: (archivedUserPrompts: any) => {},

  allImages: [],
  setAllImages: (allImages: any) => {},

  prompts: [],
  setPrompts: (prompts: any) => {},

  captureId: "",
  setCaptureId: (captureId: string) => {},

  promptAnswer: null,
  setPromptAnswer: (promptAnswer: any) => {},

  matches: [],
  setMatches: (matches: any) => {},

  voteOnboard: false,
  setVoteOnboard: (voteOnboard: boolean) => {},
};

export const UserProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<any>) => {
      const { userProfile } = action.payload;
      state.userProfile = userProfile;
    },
    setAllPrompts: (state, action: PayloadAction<any>) => {
      const { allPrompts } = action.payload;
      state.allPrompts = allPrompts;
    },
    setUserPromptIds: (state, action: PayloadAction<any>) => {
      state.userPromptIds = action.payload;
    },
    setUserPrompts: (state, action: PayloadAction<any>) => {
      const { promptsOrder } = action.payload;
      promptsOrder.forEach((item: any, index: any) => {
        state.userPrompts[index] = {
          ...state.userPrompts[index],
          answer: item.answer,
          promptId: item.promptId,
          userId: item.userId,
          prompt: item.prompt,
        };
      });
    },
    setArchivedUserPrompts: (state, action: PayloadAction<any>) => {
      const { archivedUserPrompts } = action.payload;
      state.archivedUserPrompts = archivedUserPrompts;
    },
    setAllImages: (state, action: PayloadAction<any>) => {
      const { allImages } = action.payload;
      state.allImages = allImages;
    },
    setPrompts: (state, action: PayloadAction<any>) => {
      state.prompts = action.payload;
    },
    setCaptureId: (state, action: PayloadAction<any>) => {
      const { captureId } = action.payload;
      state.captureId = captureId;
    },
    setPromptAnswer: (state, action: PayloadAction<any>) => {
      const { promptAnswer } = action.payload;
      const index = state.userPrompts.findIndex((item: any) => item.id === state.captureId);
      state.userPrompts[index] = {
        ...state.userPrompts[index],
        promptId: promptAnswer.promptId,
        prompt: promptAnswer.prompt,
        answer: promptAnswer.answer,
      };
    },
    setUser: (state, action: PayloadAction<any>) => {
      const { user } = action.payload;
      state.user = user;
    },

    setUserFName: (state, action: PayloadAction<any>) => {
      const { userFName } = action.payload;
      state.user = {
        ...state.user,
        firstName: userFName,
      };
    },

    setVoteOnboard: (state, action: PayloadAction<any>) => {
      const { voteOnboard } = action.payload;
      state.voteOnboard = voteOnboard;
    },
    updateAllPrompts: (state, action: PayloadAction<any>) => {
      const { promptId, previousPromptId } = action.payload;
      if (previousPromptId !== "" || previousPromptId !== null) {
        const previousIndex = state.allPrompts.findIndex(
          (item: any) => item.id === previousPromptId
        );
        state.allPrompts[previousIndex] = {
          ...state.allPrompts[previousIndex],
          filled: false,
        };
      }
      if (promptId !== "" || promptId !== null) {
        const index = state.allPrompts.findIndex((item: any) => item.id === promptId);
        state.allPrompts[index] = {
          ...state.allPrompts[index],
          filled: true,
        };
      }
    },

    setPreviousPromptId: (state, action: PayloadAction<any>) => {
      const { previousPromptId } = action.payload;
      state.previousPromptId = previousPromptId;
    },
  },
});

export const {
  setUserProfile,
  setAllPrompts,
  setUserPromptIds,
  setUserPrompts,
  setAllImages,
  setPrompts,
  setCaptureId,
  setPromptAnswer,
  setUser,
  setVoteOnboard,
  setArchivedUserPrompts,
  updateAllPrompts,
  setPreviousPromptId,
  setUserFName,
} = UserProfileSlice.actions;

export const selectUserProfile = (state: RootState) => state.userProfile.userProfile;
export const selectUserPrompts = (state: RootState) => state.userProfile.userPrompts;
export const selectAllImages = (state: RootState) => state.userProfile.allImages;
export const selectUserPromptIds = (state: RootState) => state.userProfile.userPromptIds;
export const selectCaptureId = (state: RootState) => state.userProfile.captureId;
export const selectAllPrompts = (state: RootState) => state.userProfile.allPrompts;
export const selectMixedPrompts = (state: RootState) => {
  const { allPrompts } = state.userProfile;
  const { userPrompts } = state.userProfile;
  const archievedUserPrompts = state.userProfile.archivedUserPrompts.filter(
    (usrPrmpts: any) => !userPrompts.some((item: any) => item.promptId === usrPrmpts.promptId)
  );

  // filter out userPrompts from allPrompts
  const filteredPrompts = allPrompts.filter(
    (item: any) =>
      !state.userProfile.archivedUserPrompts.some((item2: any) => item.id === item2.promptId)
  );

  // combine userPrompts and filteredPrompts
  const mixedPrompts = [
    {
      title: archievedUserPrompts.length > 0 ? "Archieved Prompts" : "",
      data: archievedUserPrompts.length > 0 ? archievedUserPrompts : [],
    },
    {
      title: "Prompts",
      data: filteredPrompts.map((item: any) => ({
        id: item.id,
        prompt: item.prompt,
        answer: item.sample_answer,
        filled: item.filled,
      })),
    },
  ];

  return mixedPrompts;
};
export const selectPromptAnswer = (state: RootState) => state.userProfile.promptAnswer;
export const selectUser = (state: RootState) => state.userProfile.user;
export const selectVoteOnboard = (state: RootState) => state.userProfile.voteOnboard;

export default UserProfileSlice.reducer;
