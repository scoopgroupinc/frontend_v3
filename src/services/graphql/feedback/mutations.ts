import { gql } from "@apollo/client";

export const SAVE_USER_FEEDBACK = gql`
  mutation saveUserFeedBack($FeedbackInput: FeedBackInput!) {
    saveUserFeedBack(feedbackInput:$FeedbackInput)
  }
`;