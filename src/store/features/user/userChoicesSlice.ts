import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../..'

interface IChoiceUser {
  userId: string
  age: string
  gender: string
  matchName: string
  matchUserId: string
  visual: {
    id: string
    userId: string
    videoOrPhoto: string
  }
}

interface IUserChoices {
  userChoices: any
  setUserChoices: (choices: any) => void
}

const initialState: IUserChoices = {
  userChoices: [],
  setUserChoices: (choices: any) => {},
}

export const UserChoicesSlice = createSlice({
  name: 'userChoices',
  initialState,
  reducers: {
    setUserChoices: (state, action: PayloadAction<any>) => {
      const {userChoices} = action.payload
      state.userChoices = userChoices
    },
  },
})

export const {setUserChoices} = UserChoicesSlice.actions

export const selectUserChoices = (state: RootState) => state.userChoices.userChoices

export default UserChoicesSlice.reducer
