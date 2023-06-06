import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface MatchState {
  userMatches: any[];
  userChoices: any[];
  activeMatch: any;
  criterias: any[];
  userMatchImages: any[];
  userMatchPrompts: any[];
  matchedUsers: any[];
}

const initialState: MatchState = {
  userMatches: [],
  userChoices: [],
  activeMatch: null,
  criterias: [],
  userMatchImages: [],
  userMatchPrompts: [],
  matchedUsers: [],
};

export const MatchSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setUserChoices: (state, action: PayloadAction<any>) => {
      const { userChoices } = action.payload;
      state.userChoices = userChoices;
    },
    setUserMatches: (state, action: PayloadAction<any>) => {
      const { userMatches } = action.payload;
      state.userMatches = userMatches;
    },
    setCriterias: (state, action: PayloadAction<any>) => {
      const { criterias } = action.payload;
      state.criterias = criterias;
    },
    RemoveActiveMatch: (state, action: PayloadAction<any>) => {
      const { activeMatchId } = action.payload;
      const resultingMatches = state.userMatches.filter((match: any) => match.id !== activeMatchId);
      state.userMatches = resultingMatches;
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
  RemoveActiveMatch,
  setCriterias,
  setUserMatchImages,
  setUserMatchPrompts,
  setMatchedUsers,
  setUserChoices,
} = MatchSlice.actions;

export const selectUserMatches = (state: RootState) => state.matches.userMatches;
export const selectCriterias = (state: RootState) => state.matches.criterias;
export const selectUserMatchImages = (state: RootState) => state.matches.userMatchImages;
export const selectUserMatchPrompts = (state: RootState) => state.matches.userMatchPrompts;
export const selectMatchedUsers = (state: RootState) => state.matches.matchedUsers;
export const selectUserChoices = (state: RootState) => state.matches.userChoices;

export default MatchSlice.reducer;
