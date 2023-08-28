/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FeedbackState {
  feedback: any[];
}

const initialState: FeedbackState = {
  feedback: [],
};

const FeedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedback: (state, action: PayloadAction<any>) => {
      const { feedback } = action.payload;
      state.feedback = feedback;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("appUser/logout", (state) => {
      state.feedback = initialState.feedback;
    });
  },
});

export const { setFeedback } = FeedbackSlice.actions;

export const selectFeedbacks = (state: any) => state.feedbacks.feedback;

export default FeedbackSlice.reducer;
