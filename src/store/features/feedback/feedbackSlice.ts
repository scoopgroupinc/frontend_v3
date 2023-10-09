/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FeedbackState {
  feedback: any[];
  feedbackUser: any;
}

const initialState: FeedbackState = {
  feedback: [],
  feedbackUser: null,
};

const FeedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbackUser: (state, action: PayloadAction<any>) => {
      const { feedbackUser } = action.payload;
      const tagVisibility = {};
      Object.values(feedbackUser.tags).forEach((tag) => {
        tagVisibility[tag.tagType] = tag;
      });
      state.feedbackUser = feedbackUser;
      state.feedbackUser.tags = tagVisibility;
    },
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

export const { setFeedback, setFeedbackUser } = FeedbackSlice.actions;

export const selectFeedbacks = (state: any) => state.feedbacks.feedback;
export const selectFeedbackUser = (state: any) => state.feedbacks.feedbackUser;

export default FeedbackSlice.reducer;
