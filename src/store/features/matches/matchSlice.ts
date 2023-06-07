/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../..";

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

const MatchSlice = createSlice({
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
    RemoveActiveChoice: (state, action: PayloadAction<any>) => {
      const { activeChoiceId } = action.payload;
      const resultingChoices = state.userChoices.filter(
        (choice: any) => choice.id !== activeChoiceId
      );
      state.userChoices = resultingChoices;
    },
    setUserMatchImages: (state, action: PayloadAction<any>) => {
      const { userMatchImages } = action.payload;
      state.userMatchImages = userMatchImages;
    },
    setUserMatchPrompts: (state, action: PayloadAction<any>) => {
      const { promptsOrder } = action.payload;
      promptsOrder.forEach((item: any) => {
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
  extraReducers: (builder) => {
    builder.addCase("appUser/logout", (state) => {
      state.userChoices = [];
    });
  },
});

export const {
  setUserMatches,
  RemoveActiveChoice,
  setCriterias,
  setUserMatchImages,
  setUserMatchPrompts,
  setMatchedUsers,
  setUserChoices,
} = MatchSlice.actions;

export const selectUserMatches = (state: any) => state.matches.userMatches;
export const selectCriterias = (state: any) => state.matches.criterias;
export const selectUserMatchImages = (state: any) => state.matches.userMatchImages;
export const selectUserMatchPrompts = (state: any) => state.matches.userMatchPrompts;
export const selectMatchedUsers = (state: any) => state.matches.matchedUsers;
export const selectUserChoices = (state: any) => state.matches.userChoices;

export default MatchSlice.reducer;
