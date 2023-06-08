/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../..";

export interface Prompt {
  id: string;
  prompt: string;
  sample_answer: string;
  type: string;
}
export interface PromptState {
  allPrompts: Prompt[];
}

const initialState: PromptState = {
  allPrompts: [],
};

const PromptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setAllPrompts: (state, action: PayloadAction<any>) => {
      const { allPrompts } = action.payload;
      state.allPrompts = allPrompts;
    },
  },
});

export const selectAllPrompts = (state: any) => state.appPrompts.allPrompts;

export const { setAllPrompts } = PromptSlice.actions;

export default PromptSlice.reducer;
