/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { isEqual, cloneDeep } from "lodash";
import { multiRemove, storeObjectData } from "../../../utils/storage";
import { UserPrompt } from "../../../utils/types";
import { UserProfile } from "./types";

interface UserState {
  user: any;
  userVisuals: any;
  userProfile: UserProfile;
  userPreference: any;
  userPrompts: { [key: string]: UserPrompt };
  userPromptsOrder: any[];
  editPromptIndex: any;
  editPrompt: any;
  originalUser: any;
  originalVisuals: any;
  originalProfile: any;
  originalPrompts: any;
  isUserDirty: boolean;
  isEditPromptDirty: boolean;
  isUserPromptsDirty: boolean;
  isUserPromptsOrderDirty: boolean;
  isUserVisualsDirty: boolean;
  isUserProfileDirty: boolean;
}

const initialState: UserState = {
  user: null,
  userVisuals: null,
  userProfile: [],
  userPreference: null,
  userPrompts: {},
  userPromptsOrder: [],
  editPromptIndex: null,
  editPrompt: null,
  originalUser: null,
  originalVisuals: null,
  originalProfile: null,
  originalPrompts: null,
  isUserDirty: false,
  isEditPromptDirty: false,
  isUserPromptsDirty: false,
  isUserPromptsOrderDirty: false,
  isUserVisualsDirty: false,
  isUserProfileDirty: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      const { user } = action.payload;
      storeObjectData("user", action.payload);
      state.user = user;
      state.isUserDirty = state.originalUser !== null && !isEqual(state.user, state.originalUser);
    },
    updateUser: (state, action: PayloadAction<any>) => {
      const { value } = action.payload;
      state.user = { ...state.user, ...value };
      storeObjectData("user", { ...state.user, ...value });
      state.isUserDirty = !!state.originalUser && !isEqual(state.user, state.originalUser);
    },
    setUserVisuals: (state, action: PayloadAction<any>) => {
      const { userVisuals } = action.payload;
      state.userVisuals = userVisuals;
      storeObjectData("userVisuals", action.payload);
      state.userVisuals = userVisuals;
      state.isUserVisualsDirty =
        !!state.originalVisuals && !isEqual(state.userVisuals, state.originalVisuals);
    },
    setUserPreference: (state, action: PayloadAction<any>) => {
      state.userPreference = cloneDeep(action.payload.userPreference);
    },
    setUserPrompts: (state, action: PayloadAction<any>) => {
      const { userPrompts } = action.payload;
      const prompts = cloneDeep(userPrompts);
      const results = {};

      prompts.forEach((prompt: UserPrompt) => {
        results[prompt.promptId] = prompt;
      });
      state.userPrompts = results;
      state.isUserPromptsDirty =
        !!state.originalPrompts && !isEqual(state.userPrompts, state.originalPrompts);
    },
    setUserPromptsOrder: (state, action: PayloadAction<any>) => {
      state.userPromptsOrder = cloneDeep(action.payload.userPrompts) || [];
    },
    setUserProfile: (state, action: PayloadAction<any>) => {
      const { userProfile } = action.payload;
      state.userProfile = userProfile;
      state.isUserProfileDirty =
        !!state.originalProfile && !isEqual(state.userProfile, state.originalProfile);
    },
    copyUserData: (state) => {
      state.originalUser = cloneDeep(state.user);
      state.originalVisuals = cloneDeep(state.userVisuals);
      state.originalProfile = cloneDeep(state.userProfile);
      state.originalPrompts = cloneDeep(state.userPrompts);
      state.isUserDirty = false;
      state.isUserPromptsDirty = false;
      state.isUserPromptsOrderDirty = false;
      state.isUserVisualsDirty = false;
      state.isUserProfileDirty = false;
    },
    resetToCopyData: (state) => {
      state.user = cloneDeep(state.originalUser);
      state.userVisuals = cloneDeep(state.originalVisuals);
      state.userProfile = cloneDeep(state.originalProfile);
      state.userPrompts = cloneDeep(state.originalPrompts);
      state.originalVisuals = null;
      state.originalProfile = null;
      state.originalPrompts = null;
      state.isUserDirty = false;
      state.isUserPromptsDirty = false;
      state.isUserPromptsOrderDirty = false;
      state.isUserVisualsDirty = false;
      state.isUserProfileDirty = false;
    },
    clearCopyData: (state) => {
      state.originalUser = null;
      state.originalVisuals = null;
      state.originalProfile = null;
      state.originalPrompts = null;
      state.isUserDirty = false;
      state.isUserPromptsDirty = false;
      state.isUserPromptsOrderDirty = false;
      state.isUserVisualsDirty = false;
      state.isUserProfileDirty = false;
    },
    setEditPromptIndex: (state, action: PayloadAction<any>) => {
      const { editPromptIndex } = action.payload;
      state.editPromptIndex = editPromptIndex;
    },
    setEditPrompt: (state, action: PayloadAction<any>) => {
      const { editPrompt } = action.payload;
      state.editPrompt = { ...editPrompt };
      state.isEditPromptDirty = !isEqual(state.editPrompt, editPrompt);
    },
    setPromptIdOfEditIndex: (state, action: PayloadAction<any>) => {
      const userPromptsOrder = cloneDeep(state.userPromptsOrder);
      userPromptsOrder[state.editPromptIndex] = action.payload;
      state.userPromptsOrder = userPromptsOrder;
      state.isUserPromptsOrderDirty = !isEqual(state.userPromptsOrder, state.userPromptsOrder);
    },
    setPromptToEdit: (state, action: PayloadAction<any>) => {
      const userPrompts = cloneDeep(state.userPrompts);
      userPrompts[state.editPrompt.promptId] = action.payload;
      state.userPrompts = userPrompts;
      state.isUserPromptsDirty = !isEqual(state.userPrompts, state.originalPrompts);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("appUser/logout", (state) => {
        Object.assign(state, initialState);

        multiRemove(["user", "userToken", "token", "userVisuals"]);
      })
      .addCase("appUser/deleteAccount", (state) => {
        Object.assign(state, initialState);
        multiRemove(["user", "userToken", "token", "userVisuals"]);
      });
  },
});

export const selectUser = (state: { appUser: UserState }) => state.appUser;
export const selectUserIsOnboarded = (state: { appUser: UserState }) =>
  state.appUser.user?.isOnboarded;
export const selectIsVoteOnboarded = (state: { appUser: UserState }) =>
  state.appUser.user?.isVoteOnboarded;
export const selectUserId = (state: { appUser: UserState }) => state.appUser.user?.userId;
export const selectUserProfile = (state: { appUser: UserState }) => state.appUser.userProfile;
export const selectUserVisuals = (state: { appUser: UserState }) => state.appUser.userVisuals;
export const selectUserPrompts = (state: { appUser: UserState }) => state.appUser.userPrompts || {};
export const selectUserPromptsOrder = (state: { appUser: UserState }) =>
  state.appUser.userPromptsOrder || [];
export const selectEditPromptIndex = (state: { appUser: UserState }) =>
  state.appUser.editPromptIndex;
export const selectEditPrompt = (state: { appUser: UserState }) => state.appUser.editPrompt;
export const selectEditPromptAnswer = (state: { appUser: UserState }) =>
  state.appUser.editPrompt.answer;
export const selectIsDirty = ({
  appUser: { isUserDirty, isUserPromptsDirty, isUserVisualsDirty, isUserProfileDirty },
}: {
  appUser: UserState;
}) => isUserDirty || isUserPromptsDirty || isUserVisualsDirty || isUserProfileDirty;
export const selectIsUserDirty = (state: { appUser: UserState }) => state.appUser.isUserDirty;
export const selectIsEditPromptDirty = (state: { appUser: UserState }) =>
  state.appUser.isEditPromptDirty;
export const selectIsUserPromptsDirty = (state: { appUser: UserState }) =>
  state.appUser.isUserPromptsDirty;
export const selectIsUserPromptsOrderDirty = (state: { appUser: UserState }) =>
  state.appUser.isUserPromptsOrderDirty;
export const selectisUserVisualsDirty = (state: { appUser: UserState }) =>
  state.appUser.isUserVisualsDirty;
export const selectIsUserProfileDirty = (state: { appUser: UserState }) =>
  state.appUser.isUserProfileDirty;

export const {
  setUser,
  setUserVisuals,
  updateUser,
  setUserPreference,
  setUserProfile,
  setUserPrompts,
  setUserPromptsOrder,
  setEditPromptIndex,
  // setEditPromptId,
  setEditPrompt,
  setPromptIdOfEditIndex,
  setPromptToEdit,
  copyUserData,
  clearCopyData,
  resetToCopyData,
} = UserSlice.actions;

export default UserSlice.reducer;
