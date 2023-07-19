import { gql } from "@apollo/client";

export const SAVE_USER_FEEDBACK = gql`
  mutation saveUserFeedBack($feedbackInput: FeedBackInput!) {
    saveUserFeedBack(feedbackInput: $feedbackInput)
  }
`;
