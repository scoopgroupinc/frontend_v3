import { createSelector } from "@reduxjs/toolkit";
import { selectEditPrompt } from "../user/userSlice";
import { selectAllPrompts } from "./promptsSlice";

export const selectEditPromptDefaults = createSelector(
  [selectEditPrompt, selectAllPrompts],
  (editPrompt, allPrompts) => allPrompts[editPrompt.promptId]
);
