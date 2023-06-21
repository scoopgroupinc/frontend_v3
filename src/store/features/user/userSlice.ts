/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { multiRemove, removeData, storeObjectData } from "../../../utils/storage";
import { UserPrompts } from "../../../utils/types";
import { mapIndexToPrompts } from "../../../utils/helpers";

const counter = 6;
const initialPromptsData: UserPrompts[] = [...Array(counter)].map(mapIndexToPrompts);

interface UserState {
  user: any;
  userVisuals: any;
  userProfile: any;
  userPrompts: any;
  editPromptIndex: any;
  editPrompt: any;
  originalUser: any;
  originalVisuals: any;
  originalProfile: any;
  originalPrompts: any;
}

const initialState: UserState = {
  user: null,
  userVisuals: null,
  userProfile: null,
  userPrompts: initialPromptsData,
  editPromptIndex: null,
  editPrompt: null,
  originalUser: null,
  originalVisuals: null,
  originalProfile: null,
  originalPrompts: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      const { user } = action.payload;
      state.user = user;
      storeObjectData("user", action.payload);
    },
    setUserVisuals: (state, action: PayloadAction<any>) => {
      const { userVisuals } = action.payload;
      state.userVisuals = userVisuals;
      storeObjectData("userVisuals", action.payload);
    },
    setUserPrompts: (state, action: PayloadAction<any>) => {
      const { userPrompts } = action.payload;
      state.userPrompts = cloneDeep(userPrompts);
    },
    updateUser: (state, action: PayloadAction<any>) => {
      const { value } = action.payload;
      state.user = { ...state.user, ...value };
      removeData("user");
      storeObjectData("user", { ...state.user, ...value });
    },
    setUserProfile: (state, action: PayloadAction<any>) => {
      const { userProfile } = action.payload;
      state.userProfile = userProfile;
    },

    // logout: (state) => {
    //   state.user = null;
    //   state.userVisuals = null;
    //   multiRemove(["user", "userToken", "token", "onboardKey", "userVisuals"]);
    // },
    // deleteAccount: (state) => {
    //   state.user = null;
    //   state.userVisuals = null;
    //   multiRemove(["user", "userToken", "token", "onboardKey", "userVisuals"]);
    // },
    copyUserData: (state) => {
      state.originalUser = cloneDeep(state.user);
      state.originalVisuals = cloneDeep(state.userVisuals);
      state.originalProfile = cloneDeep(state.userProfile);
      state.originalPrompts = cloneDeep(state.userPrompts);
    },
    resetToCopyData: (state) => {
      state.user = cloneDeep(state.originalUser);
      state.userVisuals = cloneDeep(state.originalVisuals);
      state.userProfile = cloneDeep(state.originalProfile);
      state.userPrompts = cloneDeep(state.originalPrompts);
      state.originalVisuals = null;
      state.originalProfile = null;
      state.originalPrompts = null;
    },
    clearCopyData: (state) => {
      state.originalUser = null;
      state.originalVisuals = null;
      state.originalProfile = null;
      state.originalPrompts = null;
    },
    setEditPromptIndex: (state, action: PayloadAction<any>) => {
      const { editPromptIndex } = action.payload;
      state.editPromptIndex = editPromptIndex;
    },
    setEditPrompt: (state, action: PayloadAction<any>) => {
      const { editPrompt } = action.payload;
      state.editPrompt = { ...editPrompt };
    },
    setPromptOfEditIndex: (state, action: PayloadAction<any>) => {
      const userPrompts = cloneDeep(state.userPrompts);
      userPrompts[state.editPromptIndex] = {
        id: state.editPromptIndex.toString(),
        ...action.payload,
      };
      state.userPrompts = userPrompts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("appUser/logout", (state) => {
        // state.user = null;
        // state.userVisuals = null;
        // state.userPrompts = initialPromptsData;
        // state.userProfile = null;
        Object.assign(state, initialState);

        multiRemove(["user", "userToken", "token", "onboardKey", "userVisuals"]);
      })
      .addCase("appUser/deleteAccount", (state) => {
        Object.assign(state, initialState);
        multiRemove(["user", "userToken", "token", "onboardKey", "userVisuals"]);
      });
  },
});

export const selectUser = (state: any) => state.appUser;
export const selectUserId = (state: any) => state.appUser.user?.userId;
export const selectUserProfile = (state: any) => state.appUser.userProfile;
export const selectUserVisuals = (state: any) => state.appUser.userVisuals;
export const selectUserPrompts = (state: any) => state.appUser.userPrompts;
export const selectEditPromptIndex = (state: any) => state.appUser.editPromptIndex;
export const selectEditPrompt = (state: any) => state.appUser.editPrompt;
export const selectEditPromptAnswer = (state: any) => state.appUser.editPrompt.answer;

export const {
  setUser,
  setUserVisuals,
  updateUser,
  setUserProfile,
  setUserPrompts,
  setEditPromptIndex,
  setEditPrompt,
  setPromptOfEditIndex,
  copyUserData,
  clearCopyData,
  resetToCopyData,
} = UserSlice.actions;

export default UserSlice.reducer;
