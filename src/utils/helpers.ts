import { cloneDeep } from "lodash";
import CryptoJS from "react-native-crypto-js";

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

export const decryptData = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export const encryptData = (obj: any) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), "secret key 123").toString();
  return ciphertext;
};

export type Item = ReturnType<typeof mapIndexToPrompts>;
export type UserVisualsType = ReturnType<typeof mapIndexToUserVisuals>;
