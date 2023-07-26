import { cloneDeep } from "lodash";

export const cloneArray = (array: any[]) => {
  if (array) {
    return cloneDeep(array);
  }
  return [];
};

export const mapIndexToUserVisuals = (d: any, index: number, arr: any[]) => ({
  id: null,
  createdAt: null,
  userId: "",
  videoOrPhoto: "",
  visualPromptId: "",
  deletedAt: "",
  description: "",
  order: `${index}`,
  isVisible: true,
});

export const mapIndexToPrompts = (d: any, index: number, arr: any[]) => ({
  id: `${index}`,
  userId: "",
  promptId: "",
  prompt: "",
  answer: "",
});

export type Item = ReturnType<typeof mapIndexToPrompts>;
export type UserVisualsType = ReturnType<typeof mapIndexToUserVisuals>;
