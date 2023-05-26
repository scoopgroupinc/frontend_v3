import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  multiRemove,
  removeData,
  storeObjectData,
} from "../../../utils/storage";

export interface UserState {
  user: any;
}

const initialState: UserState = {
  user: null,
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
    logout: (state) => {
      state.user = null;
      multiRemove(["user", "userToken"]);
    },
  },
});

export const { setUser, logout } = UserSlice.actions;

export default UserSlice.reducer;
