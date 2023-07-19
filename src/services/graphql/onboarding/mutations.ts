import { gql } from "@apollo/client";

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

export const SAVE_GENDER_PREFENCE = gql`
  mutation saveUserPreference($userPreferenceInput: UserPreferenceInput!) {
    saveUserPreference(userPreferenceInput: $userPreferenceInput) {
      userId
      gender
    }
  }
`;
