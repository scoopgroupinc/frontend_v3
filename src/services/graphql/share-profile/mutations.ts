import { gql } from "@apollo/client";

export const CREATE_SHARE_PROFILE_FEEDBACK = gql`
  mutation CreateShareProfileFeedback(
    $feedbackGroupInput: FeedbackGroupInput!
    $personalityFeedbacksInput: [PersonalityFeedbackInput!]!
    $profileFeedbackInput: ProfileFeedbackInput!
  ) {
    createShareProfileFeedback(
      feedbackGroupInput: $feedbackGroupInput
      personalityFeedbacksInput: $personalityFeedbacksInput
      profileFeedbackInput: $profileFeedbackInput
    ) {
      id
      createdAt
      userId
      raterId
      templateId
      profileFeedback {
        id
        createdAt
        description
        name
        feedbackGroupId
      }
      personalityFeedbacks {
        id
        createdAt
        personality
        feedbackGroupId
      }
    }
  }
`;

// use when user logins after submitting feedback
export const UPDATE_SHARE_PROFILE_RATER_ID = gql`
  mutation UpdateShareProfileRaterId($id: String!, $raterId: String) {
    updateShareProfileRaterId(id: $id, raterId: $raterId) {
      id
      userId
      createdAt
      state
      templateId
    }
  }
`;
