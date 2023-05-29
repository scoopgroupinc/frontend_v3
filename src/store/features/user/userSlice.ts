import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  multiRemove,
  removeData,
  storeObjectData,
} from "../../../utils/storage";

export interface UserState {
  user: any;
  userVisuals: any;
}

const initialState: UserState = {
  user: null,
  userVisuals: null,
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
    updateUser: (state, action: PayloadAction<any>) => {
      const { value } = action.payload;
      state.user = { ...state.user, ...value };
      removeData("user");
      storeObjectData("user", { ...state.user, ...value });
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

export const { setUser, setUserVisuals, updateUser } = UserSlice.actions;

export default UserSlice.reducer;
