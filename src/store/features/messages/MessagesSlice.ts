/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMessagesContext {
  userMessages: any;
}

const initialState: IMessagesContext = {
  userMessages: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getUserMessages: (state, action: PayloadAction<any>) => {
      const { userMatchId } = action.payload;
      state.userMessages = state.userMessages.filter(
        (message: any) => message.userMatchId === userMatchId
      );
    },

    setMessages: (state, action: PayloadAction<any>) => {
      const { messages } = action.payload;
      state.userMessages = messages;
    },

    setUserMessages: (state, action: PayloadAction<any>) => {
      const { matchUserId, message } = action.payload;
      const matchUserMessages = state.userMessages.find(
        (message: any) => message.matchUserId === matchUserId
      );
      state.userMessages = state.userMessages.map((message: any) => {
        if (message.matchUserId === matchUserId) {
          return {
            ...message,
            mgs: [...message.mgs, message],
          };
        }
        return message;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase("appUser/logout", (state) => {
      state.userMessages = null;
    });
  },
});

export const { setMessages, getUserMessages, setUserMessages } = messagesSlice.actions;

export const selectMessages = (state: any) => state.messages.userMessages;

export default messagesSlice.reducer;
