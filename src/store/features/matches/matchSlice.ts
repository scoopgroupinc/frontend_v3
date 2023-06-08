/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../..";

interface MatchState {
  userMatches: any[];
  userChoices: any[];
  activeMatch: any;
  criterias: any[];
  userChoiceImages: any[];
  userChoicePrompts: any[];
  matchedUsers: any[];
}

const initialState: MatchState = {
  userMatches: [],
  userChoices: [],
  activeMatch: null,
  criterias: [],
  userChoiceImages: [],
  userChoicePrompts: [],
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
    setUserChoiceImages: (state, action: PayloadAction<any>) => {
      const { userChoiceImages } = action.payload;
      state.userChoiceImages = userChoiceImages;
    },
    setUserChoicePrompts: (state, action: PayloadAction<any>) => {
      const { promptsOrder } = action.payload;
      promptsOrder.forEach((item: any) => {
        state.userChoicePrompts.push({
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
      state.userChoiceImages = [];
      state.userChoicePrompts = [];
    });
  },
});

export const {
  setUserMatches,
  RemoveActiveChoice,
  setCriterias,
  setUserChoiceImages,
  setUserChoicePrompts,
  setMatchedUsers,
  setUserChoices,
} = MatchSlice.actions;

export const selectUserMatches = (state: any) => state.matches.userMatches;
export const selectCriterias = (state: any) => state.matches.criterias;
export const selectUserChoiceImages = (state: any) => state.matches.userChoiceImages;
export const selectUserChoicePrompts = (state: any) => state.matches.userChoicePrompts;
export const selectMatchedUsers = (state: any) => state.matches.matchedUsers;
export const selectUserChoices = (state: any) => state.matches.userChoices;

export default MatchSlice.reducer;
