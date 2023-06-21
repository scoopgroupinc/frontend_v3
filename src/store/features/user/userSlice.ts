/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import clonedeep from "lodash.clonedeep";
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
      state.userPrompts = clonedeep(userPrompts);
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
      state.originalUser = clonedeep(state.user);
      state.originalVisuals = clonedeep(state.userVisuals);
      state.originalProfile = clonedeep(state.userProfile);
      state.originalPrompts = clonedeep(state.userPrompts);
    },
    resetToCopyData: (state) => {
      state.user = clonedeep(state.originalUser);
      state.userVisuals = clonedeep(state.originalVisuals);
      state.userProfile = clonedeep(state.originalProfile);
      state.userPrompts = clonedeep(state.originalPrompts);
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
    setTempProfilePromptOfEditIndex: (state, action: PayloadAction<any>) => {
      const userPrompts = clonedeep(state.userPrompts);
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
  setTempProfilePromptOfEditIndex,
  copyUserData,
  clearCopyData,
  resetToCopyData,
} = UserSlice.actions;

export default UserSlice.reducer;
