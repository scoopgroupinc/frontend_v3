/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../..";

export interface Prompt {
  id: string;
  prompt: string;
  sample_answer: string;
  type: string;
}

export interface Tag {
  id: string;
  name: string;
  emoji: string;
  type: string;
  order: number;
  visible: boolean;
}

export interface PromptState {
  allPrompts: { [id: string]: Prompt };
  allTags: Tag[];
}

const initialState: PromptState = {
  allPrompts: {},
  allTags: [],
};

const PromptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    setAllPrompts: (state, action: PayloadAction<any>) => {
      const { allPrompts } = action.payload;
      allPrompts.forEach((prompt: Prompt) => {
        state.allPrompts[prompt.id] = prompt;
      });
    },
    setAllTags: (state, action: PayloadAction<any>) => {
      const { allTags } = action.payload;
      state.allTags = allTags;
    },
  },
});

export const selectAllPrompts = (state: any) => state.appPrompts.allPrompts;
export const selectAllTags = (state: any) => state.appPrompts.allTags;

export const { setAllPrompts, setAllTags } = PromptSlice.actions;

export default PromptSlice.reducer;
