import { gql } from "@apollo/client";

export const SAVE_USER_PROMPT = gql`
  mutation handleSaveUserPrompt($userPromptInput: UserPromptInput!) {
    handleSaveUserPrompt(userPromptInput: $userPromptInput) {
      id
      createdAt
      userId
      promptId
      answer
    }
  }
`;

export const SAVE_USER_PROMPTS = gql`
  mutation saveUserPrompts($userPromptsInput: [UserPromptInput!]!) {
    saveUserPrompts(userPromptsInput: $userPromptsInput) {
      userPrompts {
        userId
        promptId
        answer
        createdAt
      }
      promptIds
    }
  }
`;

export const SAVE_USER_PROMPT_ORDER = gql`
  mutation saveUserPromptsOrder($userPromptsOrderInput: UserPromptsOrderInput!) {
    saveUserPromptsOrder(userPromptsOrder: $userPromptsOrderInput) {
      userPrompts {
        id
        userId
        promptId
        answer
        createdAt
      }
      promptIds
    }
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
      addressLine1
      addressLine2
      stateProvince
      country
      city
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
      userId
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
