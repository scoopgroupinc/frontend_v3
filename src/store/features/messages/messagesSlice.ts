import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../..";

interface IMessagesContext {
  messages: any
  setMessages: (messages: any) => void
}

export const initialState: IMessagesContext = {
  messages: [],
  setMessages: (messages: any) => {},
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getUserMessages: (state, action: PayloadAction<any>) => {
      const {userMatchId} = action.payload
      state.messages = state.messages.filter((message: any) => message.userMatchId === userMatchId)
    },

    setMessages: (state, action: PayloadAction<any>) => {
      const {messages} = action.payload
      state.messages = messages
    },

    setUserMessages: (state, action: PayloadAction<any>) => {
      const {matchUserId, message} = action.payload
      const matchUserMessages = state.messages.find(
        (message: any) => message.matchUserId === matchUserId
      )
      state.messages = state.messages.map((message: any) => {
        if (message.matchUserId === matchUserId) {
          return {
            ...message,
            mgs: [...message.mgs, message],
          }
        }
        return message
      })
    },
  },
})

export const {setMessages, getUserMessages, setUserMessages} = messagesSlice.actions

export const selectMessages = (state: RootState) => state.messages.messages

export default messagesSlice.reducer
