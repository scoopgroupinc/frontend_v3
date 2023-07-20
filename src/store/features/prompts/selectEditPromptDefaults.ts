import { createSelector } from "@reduxjs/toolkit";
import { selectEditPrompt, selectUserPromptsOrder } from "../user/userSlice";
import { selectAllPrompts } from "./promptsSlice";

export const selectEditPromptDefaults = createSelector(
  [selectEditPrompt, selectAllPrompts],
  (editPrompt, allPrompts) => allPrompts[editPrompt.promptId]
);

export const selectAvailablePrompts = createSelector(
  [selectUserPromptsOrder, selectAllPrompts],
  (promptIds, allPrompts) => {
    const allPromptsClone = { ...allPrompts };
    promptIds.forEach((id) => {
      delete allPromptsClone[id];
    });
    return allPromptsClone;
  }
);
