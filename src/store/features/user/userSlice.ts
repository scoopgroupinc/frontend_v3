/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { isEqual, cloneDeep } from "lodash";
import { multiRemove, removeData, storeObjectData } from "../../../utils/storage";
import { UserPrompts } from "../../../utils/types";
import { mapIndexToPrompts } from "../../../utils/helpers";

const counter = 6;
const initialPromptsData: UserPrompts[] = [...Array(counter)].map(mapIndexToPrompts);

interface UserState {
  user: any;
  userVisuals: any;
  userProfile: any;
  userPreference: any;
  userPrompts: any;
  userPromptsOrder: any[];
  editPromptIndex: any;
  editPrompt: any;
  originalUser: any;
  originalVisuals: any;
  originalProfile: any;
  originalPrompts: any;
  isDirty: boolean;
}

const initialState: UserState = {
  user: null,
  userVisuals: null,
  userProfile: null,
  userPreference: null,
  userPrompts: initialPromptsData,
  userPromptsOrder: [],
  editPromptIndex: null,
  editPrompt: null,
  originalUser: null,
  originalVisuals: null,
  originalProfile: null,
  originalPrompts: null,
  isDirty: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      const { user } = action.payload;
      state.user = user;
      storeObjectData("user", action.payload);
      if (state.originalUser != null && !isEqual(state.user, state.originalUser)) {
        state.isDirty = true;
      } else {
        state.isDirty = false;
      }
    },
    setUserVisuals: (state, action: PayloadAction<any>) => {
      const { userVisuals } = action.payload;
      state.userVisuals = userVisuals;
      storeObjectData("userVisuals", action.payload);
      if (!!state.originalVisuals && !isEqual(state.userVisuals, state.originalVisuals)) {
        state.isDirty = true;
      } else {
        state.isDirty = false;
      }
    },
    setUserPreference: (state, action: PayloadAction<any>) => {
      state.userPreference = cloneDeep(action.payload.userPreference);
    },
    setUserPrompts: (state, action: PayloadAction<any>) => {
      const { userPrompts } = action.payload;
      const prompts = cloneDeep(userPrompts);

      for (let i = 0; i < counter; i++) {
        if (!prompts[i]) {
          prompts.push({
            id: `${i}`,
            userId: "",
            promptId: "",
            prompt: "",
            answer: "",
          });
        }
      }
      if (!!state.originalPrompts && !isEqual(state.userPrompts, state.originalPrompts)) {
        state.isDirty = true;
      } else {
        state.isDirty = false;
      }
      state.userPrompts = prompts;
    },
    setUserPromptsOrder: (state, action: PayloadAction<any>) => {
      state.userPromptsOrder = cloneDeep(action.payload.userPrompts);
    },
    updateUser: (state, action: PayloadAction<any>) => {
      const { value } = action.payload;
      state.user = { ...state.user, ...value };
      storeObjectData("user", { ...state.user, ...value });
      if (!!state.originalUser && !isEqual(state.user, state.originalUser)) {
        state.isDirty = true;
      } else {
        state.isDirty = false;
      }
    },
    setUserProfile: (state, action: PayloadAction<any>) => {
      const { userProfile } = action.payload;
      state.userProfile = userProfile;
      if (!!state.originalProfile && !isEqual(state.userProfile, state.originalProfile)) {
        state.isDirty = true;
      } else {
        state.isDirty = false;
      }
    },

    // logout: (state) => {
    //   state.user = null;
    //   state.userVisuals = null;
    //   multiRemove(["user", "userToken", "token", "userVisuals"]);
    // },
    // deleteAccount: (state) => {
    //   state.user = null;
    //   state.userVisuals = null;
    //   multiRemove(["user", "userToken", "token", "userVisuals"]);
    // },
    copyUserData: (state) => {
      state.originalUser = cloneDeep(state.user);
      state.originalVisuals = cloneDeep(state.userVisuals);
      state.originalProfile = cloneDeep(state.userProfile);
      state.originalPrompts = cloneDeep(state.userPrompts);
      state.isDirty = false;
    },
    resetToCopyData: (state) => {
      state.user = cloneDeep(state.originalUser);
      state.userVisuals = cloneDeep(state.originalVisuals);
      state.userProfile = cloneDeep(state.originalProfile);
      state.userPrompts = cloneDeep(state.originalPrompts);
      state.originalVisuals = null;
      state.originalProfile = null;
      state.originalPrompts = null;
      state.isDirty = false;
    },
    clearCopyData: (state) => {
      state.originalUser = null;
      state.originalVisuals = null;
      state.originalProfile = null;
      state.originalPrompts = null;
      state.isDirty = false;
    },
    setEditPromptIndex: (state, action: PayloadAction<any>) => {
      const { editPromptIndex } = action.payload;
      state.editPromptIndex = editPromptIndex;
    },
    setEditPrompt: (state, action: PayloadAction<any>) => {
      const { editPrompt } = action.payload;
      state.editPrompt = { ...editPrompt };
      if (isEqual(state.editPrompt, editPrompt)) {
        state.isDirty = false;
      } else {
        state.isDirty = true;
      }
    },
    setPromptOfEditIndex: (state, action: PayloadAction<any>) => {
      const userPrompts = cloneDeep(state.userPrompts);
      userPrompts[state.editPromptIndex] = {
        id: state.editPromptIndex.toString(),
        ...action.payload,
      };
      state.userPrompts = userPrompts;
      if (isEqual(state.userPrompts, state.originalPrompts)) {
        state.isDirty = false;
      } else {
        state.isDirty = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("appUser/logout", (state) => {
        // state.user = null;
        // state.userVisuals = null;
        // state.userPrompts = initialPromptsData;
        // state.userProfile = null;
        Object.assign(state, initialState);

        multiRemove(["user", "userToken", "token", "userVisuals"]);
      })
      .addCase("appUser/deleteAccount", (state) => {
        Object.assign(state, initialState);
        multiRemove(["user", "userToken", "token", "userVisuals"]);
      });
  },
});

export const selectUser = (state: any) => state.appUser;
export const selectUserIsOnboarded = (state: any) => state.appUser.user?.isOnboarded;
export const selectUserId = (state: any) => state.appUser.user?.userId;
export const selectUserProfile = (state: any) => state.appUser.userProfile;
export const selectUserVisuals = (state: any) => state.appUser.userVisuals;
export const selectUserPrompts = (state: any) => state.appUser.userPrompts;
export const selectEditPromptIndex = (state: any) => state.appUser.editPromptIndex;
export const selectEditPrompt = (state: any) => state.appUser.editPrompt;
export const selectEditPromptAnswer = (state: any) => state.appUser.editPrompt.answer;
export const selectIsDirty = (state: any) => state.appUser.isDirty;

export const {
  setUser,
  setUserVisuals,
  updateUser,
  setUserPreference,
  setUserProfile,
  setUserPrompts,
  setUserPromptsOrder,
  setEditPromptIndex,
  setEditPrompt,
  setPromptOfEditIndex,
  copyUserData,
  clearCopyData,
  resetToCopyData,
} = UserSlice.actions;

export default UserSlice.reducer;
