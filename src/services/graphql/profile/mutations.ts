import { gql } from "@apollo/client";

export const SAVE_USER_PROMPT = gql`
  mutation SaveUserPrompt($UserPromptInput: UserPromptsInput!) {
    saveUserPrompt(UserPromptInput: $UserPromptInput) {
      id
      createdAt
      userId
      promptId
      answer
    }
  }
`;

export const SAVE_USER_PROMPT_ORDER = gql`
  mutation SaveUserPromptOrder($UserPromptsOrder: UserPromptsOrder!) {
    saveUserPromptsOrder(userPromptsOrder: $UserPromptsOrder)
  }
`;

export const SAVE_USER_GENDER = gql`
  mutation saveUserProfile($UserProfileInput: UserProfileInput!) {
    saveUserProfile(userProfileInput: $UserProfileInput) {
      userId
      gender
    }
  }
`;

export const SAVE_USER_LOCATION = gql`
  mutation saveUserLocation($CreateLocationInput: CreateLocationInput!) {
    saveUserLocation(createLocationInput: $CreateLocationInput) {
      userId
      latitude
      longitude
      zipPostal
    }
  }
`;

export const SAVE_USER_HEIGHT = gql`
  mutation saveUserProfile($UserProfileInput: UserProfileInput!) {
    saveUserProfile(userProfileInput: $UserProfileInput) {
      userId
      height
    }
  }
`;

export const SAVE_USER_BIRTHDAY = gql`
  mutation saveUserProfile($UserProfileInput: UserProfileInput!) {
    saveUserProfile(userProfileInput: $UserProfileInput) {
      userId
      birthday
    }
  }
`;

export const SAVE_USER_NAME = gql`
  mutation updateUser($UpdateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $UpdateUserInput) {
      userId
      firstName
      lastName
      email
    }
  }
`;

export const SAVE_USER_TAGS_TYPE_VISIBLE = gql`
  mutation saveUserTagsTypeVisible($userTagsTypeVisibleInput: [UserTagsTypeVisibleInput!]!) {
    saveUserTagsTypeVisible(userTagsTypeVisibleInput: $userTagsTypeVisibleInput) {
      emoji
    }
  }
`;

export const SAVE_USER_PROMPTS = gql`
  mutation saveUserPrompts($UserPromptInput: [UserPromptsInput!]!) {
    saveUserPrompts(UserPromptInput: $UserPromptInput) {
      id
      createdAt
      userId
      promptId
      answer
    }
  }
`;

export const SAVE_ONBOARD_STATUS = gql`
  mutation updateOnBoarding($onboardInput: OnBoardInput!) {
    updateOnBoarding(onboardInput: $onboardInput)
  }
`;

export const SAVE_GROUP_RATING = gql`
  mutation saveRatingGroup($ratingGroupInput: SaveRatingInput!) {
    saveRatingGroup(ratingGroupInput: $ratingGroupInput)
  }
`;

export const USER_SWIPER_ACTION = gql`
  mutation userSwipeAction($choice: String!, $matchId: String!) {
    userSwipeAction(choice: $choice, matchId: $matchId) {
      message
      user1 {
        userId
        firstName
        pic
      }
      user2 {
        userId
        firstName
        pic
      }
    }
  }
`;
