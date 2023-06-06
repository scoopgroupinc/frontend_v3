import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  multiRemove,
  removeData,
  storeObjectData,
} from "../../../utils/storage";
import { UserPrompts } from "../../../utils/types";
import { mapIndexToPrompts } from "../../../utils/helpers";

const counter: number = 6;
const initialPromptsData: UserPrompts[] = [...Array(counter)].map(
  mapIndexToPrompts
);

interface UserState {
  user: any;
  userVisuals: any;
  userProfile: any;
  userPrompts: any;
}

const initialState: UserState = {
  user: null,
  userVisuals: null,
  userProfile: null,
  userPrompts: initialPromptsData,
};

export const UserSlice = createSlice({
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
      userPrompts.forEach((item: any, index: number) => {
        state.userPrompts[index] = {
          ...state.userPrompts[index],
          answer: item.answer,
          promptId: item.promptId,
          userId: item.userId,
          prompt: item.prompt,
        };
      });
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
  },
  extraReducers: (builder) => {
    builder
      .addCase("appUser/logout", (state) => {
        state.user = null;
        state.userVisuals = null;
        state.userPrompts = initialPromptsData;
        state.userProfile = null;
        multiRemove([
          "user",
          "userToken",
          "token",
          "onboardKey",
          "userVisuals",
        ]);
      })
      .addCase("appUser/deleteAccount", (state) => {
        Object.assign(state, initialState);
        multiRemove([
          "user",
          "userToken",
          "token",
          "onboardKey",
          "userVisuals",
        ]);
      });
  },
});

export const selectUser = (state: any) => state.appUser;
export const selectUserProfile = (state: any) => state.appUser.userProfile;
export const selectUserVisuals = (state: any) => state.appUser.userVisuals;
export const selectUserPrompts = (state: any) => state.appUser.userPrompts;

export const {
  setUser,
  setUserVisuals,
  updateUser,
  setUserProfile,
  setUserPrompts,
} = UserSlice.actions;

export default UserSlice.reducer;
