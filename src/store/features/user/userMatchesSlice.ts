import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface IMatchedUser {
  userId: string;
  firstName: string;
  pic: string;
}

interface IUserMatches {
  userMatches: any;
  setUserMatches: (matches: any) => void;

  activeMatch: any;
  setActiveMatch: (activeMatch: any) => void;

  criterias: any;
  setCriterias: (criterias: any) => void;

  userMatchImages: any;
  setUserMatchImages: (userMatchImages: any) => void;

  userMatchPrompts: any;
  setUserMatchPrompts: (userMatchPrompts: any) => void;

  matchedUsers: IMatchedUser[];
  setMatchedUsers: (matchedUsers: any) => void;
}

const initialState: IUserMatches = {
  userMatches: [],
  setUserMatches: (matches: any) => {},

  activeMatch: null,
  setActiveMatch: (activeMatch: any) => {},

  criterias: [],
  setCriterias: (criterias: any) => {},

  userMatchImages: [],
  setUserMatchImages: (userMatchImages: any) => {},

  userMatchPrompts: [],
  setUserMatchPrompts: (userMatchPrompts: any) => {},

  matchedUsers: [],
  setMatchedUsers: (matchedUsers: any) => {},
};

export const UserMatchesSlice = createSlice({
  name: "userMatches",
  initialState,
  reducers: {
    setUserMatches: (state, action: PayloadAction<any>) => {
      const { userMatches } = action.payload;
      state.userMatches = userMatches;
    },
    RemoveActiveMatch: (state, action: PayloadAction<any>) => {
      const { activeMatchId } = action.payload;
      const resultingMatches = state.userMatches.filter((match: any) => match.id !== activeMatchId);
      state.userMatches = resultingMatches;
    },
    setCriterias: (state, action: PayloadAction<any>) => {
      const { criterias } = action.payload;
      state.criterias = criterias;
    },
    setUserMatchImages: (state, action: PayloadAction<any>) => {
      const { userMatchImages } = action.payload;
      state.userMatchImages = userMatchImages;
    },
    setUserMatchPrompts: (state, action: PayloadAction<any>) => {
      const { promptsOrder } = action.payload;
      promptsOrder.forEach((item: any, index: any) => {
        state.userMatchPrompts.push({
          answer: item.answer,
          promptId: item.promptId,
          userId: item.userId,
          prompt: item.prompt,
        });
      });
    },
    setMatchedUsers: (state, action: PayloadAction<any>) => {
      const { matchedUsers } = action.payload;
      state.matchedUsers = matchedUsers;
    },
  },
});

export const {
  setUserMatches,
  setCriterias,
  setUserMatchImages,
  RemoveActiveMatch,
  setUserMatchPrompts,
  setMatchedUsers,
} = UserMatchesSlice.actions;

export const selectUserMatches = (state: RootState) => state.userMatches.userMatches;
export const selectCriterias = (state: RootState) => state.userMatches.criterias;
export const selectUserMatchImages = (state: RootState) => state.userMatches.userMatchImages;
export const selectUserMatchPrompts = (state: RootState) => state.userMatches.userMatchPrompts;
export const selectMatchedUsers = (state: RootState) => state.userMatches.matchedUsers;

export default UserMatchesSlice.reducer;
