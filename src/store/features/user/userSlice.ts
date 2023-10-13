/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import type { AnyListenerPredicate, PayloadAction } from "@reduxjs/toolkit";
import { isEqual, cloneDeep } from "lodash";
import { multiRemove, storeObjectData } from "../../../utils/storage";
import { UserPrompt } from "../../../utils/types";
import { UserTagsEntity, UserTagsTypeVisibleEnity, UserProfileEntity } from "./types";
import { UserVisualsType } from "../../../utils/helpers";
import { TAG_VISIBLE_TYPES } from "../../../utils/types/TAGS";

interface UserState {
  user: any;
  userVisuals: { [key: string]: AnyListenerPredicate<UserVisualsType> };
  userTags: { [key: string]: UserTagsTypeVisibleEnity };
  userPreference: any;
  userProfile: UserProfileEntity;
  userPrompts: { [key: string]: UserPrompt };
  userPromptsOrder: any[];
  editPromptIndex: any;
  editPrompt: any;
  originalUser: any;
  originalVisuals: any;
  originalTags: any;
  originalProfile: any;
  originalPrompts: any;
  isUserDirty: boolean;
  isUserProfileDirty: boolean;
  isEditPromptDirty: boolean;
  isUserPromptsDirty: boolean;
  isUserPromptsOrderDirty: boolean;
  isUserVisualsDirty: boolean;
  isUserTagsDirty: boolean;
}

const userProfileVisibility: { [key: string]: UserTagsTypeVisibleEnity } = {};
Object.keys(TAG_VISIBLE_TYPES).forEach((tag) => {
  userProfileVisibility[tag] = {
    id: "",
    userId: "",
    visible: true,
    tagType: tag,
    userTags: [] as UserTagsEntity[],
  };
});

const initialState: UserState = {
  user: null,
  userVisuals: {},
  userTags: userProfileVisibility,
  userPreference: null,
  userPrompts: {},
  userProfile: {} as UserProfileEntity,
  userPromptsOrder: [],
  editPromptIndex: null,
  editPrompt: null,
  originalUser: null,
  originalVisuals: null,
  originalTags: null,
  originalProfile: null,
  originalPrompts: null,
  isUserDirty: false,
  isUserProfileDirty: false,
  isEditPromptDirty: false,
  isUserPromptsDirty: false,
  isUserPromptsOrderDirty: false,
  isUserVisualsDirty: false,
  isUserTagsDirty: false,
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
    setFetchedUserVisuals: (state, action: PayloadAction<any>) => {
      const { userVisuals } = action.payload;
      userVisuals.forEach((visual: any, index) => {
        state.userVisuals[index] = { ...visual };
      });
      storeObjectData("userVisuals", action.payload);
      state.isUserVisualsDirty =
        !!state.originalVisuals && !isEqual(state.userVisuals, state.originalVisuals);
    },
    setUserVisuals: (state, action: PayloadAction<any>) => {
      const { userVisuals } = action.payload;
      state.userVisuals = cloneDeep(userVisuals);
      storeObjectData("userVisuals", action.payload);
      state.isUserVisualsDirty =
        !!state.originalVisuals && !isEqual(state.userVisuals, state.originalVisuals);
    },
    setUserPreference: (state, action: PayloadAction<any>) => {
      state.userPreference = cloneDeep(action.payload.userPreference);
    },
    setUserProfile: (state, action: PayloadAction<any>) => {
      state.userProfile = {
        userId: action.payload.userProfile.userId,
        createdAt: action.payload.userProfile.createdAt,
        displayName: action.payload.userProfile.displayName,
        profilePhoto: action.payload.userProfile.profilePhoto,
        birthday: action.payload.userProfile.birthday,
        height: action.payload.userProfile.height,
        gender: action.payload.userProfile.gender,
        locationId: action.payload.userProfile.locationId,
      };
      state.isUserProfileDirty =
        state.originalProfile !== null && !isEqual(state.userProfile, state.originalProfile);
    },
    setUserPrompts: (state, action: PayloadAction<any>) => {
      const { userPrompts } = action.payload;
      const prompts = cloneDeep(userPrompts);
      const results = {};

      prompts.forEach((prompt: UserPrompt) => {
        if (prompt.promptId !== undefined) {
          results[prompt.promptId] = prompt;
        }
      });
      state.userPrompts = results;
      state.isUserPromptsDirty =
        !!state.originalPrompts && !isEqual(state.userPrompts, state.originalPrompts);
    },
    setUserPromptsOrder: (state, action: PayloadAction<any>) => {
      state.userPromptsOrder = cloneDeep(action.payload.userPromptsOrder) || [];
    },
    setUserProfileVisibilityData: (state, action: PayloadAction<any>) => {
      const { userTags } = action.payload;
      state.userTags = userTags;
      state.isUserTagsDirty = !!state.originalTags && !isEqual(state.userTags, state.originalTags);
    },
    trackCurrentUserStateChanges: (state) => {
      state.originalUser = cloneDeep(state.user);
      state.originalVisuals = cloneDeep(state.userVisuals);
      state.originalProfile = cloneDeep(state.userProfile);
      state.originalTags = cloneDeep(state.userTags);
      state.originalPrompts = cloneDeep(state.userPrompts);
      state.isUserDirty = false;
      state.isUserProfileDirty = false;
      state.isUserPromptsDirty = false;
      state.isUserPromptsOrderDirty = false;
      state.isUserVisualsDirty = false;
      state.isUserTagsDirty = false;
    },
    resetToCopyData: (state) => {
      state.user = cloneDeep(state.originalUser);
      state.userVisuals = cloneDeep(state.originalVisuals);
      state.userTags = cloneDeep(state.originalTags);
      state.userPrompts = cloneDeep(state.originalPrompts);
      state.originalVisuals = null;
      state.originalTags = null;
      state.originalPrompts = null;
      state.isUserDirty = false;
      state.isUserProfileDirty = false;
      state.isUserPromptsDirty = false;
      state.isUserPromptsOrderDirty = false;
      state.isUserVisualsDirty = false;
      state.isUserTagsDirty = false;
    },
    clearCopyData: (state) => {
      state.originalUser = null;
      state.originalVisuals = null;
      state.originalTags = null;
      state.originalPrompts = null;
      state.isUserDirty = false;
      state.isUserProfileDirty = false;
      state.isUserPromptsDirty = false;
      state.isUserPromptsOrderDirty = false;
      state.isUserVisualsDirty = false;
      state.isUserTagsDirty = false;
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
export const selectUserTags = (state: { appUser: UserState }) => state.appUser.userTags;
export const selectUserVisuals = (state: { appUser: UserState }) => state.appUser.userVisuals;
export const selectUserPrompts = (state: { appUser: UserState }) => state.appUser.userPrompts || {};
export const selectUserPromptsOrder = (state: { appUser: UserState }) =>
  state.appUser.userPromptsOrder || [];
export const selectUserProfile = (state: { appUser: UserState }) => state.appUser.userProfile;
export const selectEditPromptIndex = (state: { appUser: UserState }) =>
  state.appUser.editPromptIndex;
export const selectEditPrompt = (state: { appUser: UserState }) => state.appUser.editPrompt;
export const selectEditPromptAnswer = (state: { appUser: UserState }) =>
  state.appUser.editPrompt.answer;
export const selectIsDirty = ({
  appUser: { isUserDirty, isUserPromptsDirty, isUserVisualsDirty, isUserTagsDirty },
}: {
  appUser: UserState;
}) => isUserDirty || isUserPromptsDirty || isUserVisualsDirty || isUserTagsDirty;
export const selectIsUserDirty = (state: { appUser: UserState }) => state.appUser.isUserDirty;
export const selectIsEditProfileDirty = (state: { appUser: UserState }) =>
  state.appUser.isUserProfileDirty;
export const selectIsEditPromptDirty = (state: { appUser: UserState }) =>
  state.appUser.isEditPromptDirty;
export const selectIsUserPromptsDirty = (state: { appUser: UserState }) =>
  state.appUser.isUserPromptsDirty;
export const selectIsUserPromptsOrderDirty = (state: { appUser: UserState }) =>
  state.appUser.isUserPromptsOrderDirty;
export const selectisUserVisualsDirty = (state: { appUser: UserState }) =>
  state.appUser.isUserVisualsDirty;
export const selectisUserTagsDirty = (state: { appUser: UserState }) =>
  state.appUser.isUserTagsDirty;

export const {
  setUser,
  setFetchedUserVisuals,
  setUserVisuals,
  updateUser,
  setUserPreference,
  setUserProfile,
  setUserProfileVisibilityData,
  setUserPrompts,
  setUserPromptsOrder,
  setEditPromptIndex,
  setEditPrompt,
  setPromptIdOfEditIndex,
  setPromptToEdit,
  trackCurrentUserStateChanges,
  clearCopyData,
  resetToCopyData,
} = UserSlice.actions;

export default UserSlice.reducer;
