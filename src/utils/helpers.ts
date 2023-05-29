import { cloneDeep } from "lodash";

export const cloneArray = (array: any[]) => {
  if (array) {
    return cloneDeep(array);
  }
  return [];
};

export const mapIndexToUserVisuals = (d: any, index: number, arr: any[]) => {
  return {
    id: `${index}`,
    createdAt: "",
    userId: "",
    videoOrPhoto: "",
    visualPromptId: "",
    deletedAt: "",
    description: "",
    order: "",
    isVisible: true,
  };
};

export const mapIndexToPrompts = (d: any, index: number, arr: any[]) => {
  return {
    id: `${index}`,
    userId: "",
    promptId: "",
    prompt: "",
    answer: "",
  };
};

export type Item = ReturnType<typeof mapIndexToPrompts>;
export type UserVisualsType = ReturnType<typeof mapIndexToUserVisuals>;
