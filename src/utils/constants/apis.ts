import Constants from "expo-constants";

const URLS = {
  CLIENT_URL: Constants.expoConfig.extra.CLIENT_URL,
  CHATSERVICE_BASE_URL: Constants.expoConfig.extra.CHATSERVICE_BASE_URL,
  FILE_URL: Constants.expoConfig.extra.FILE_URL,
  NOTIFICATION_URL: Constants.expoConfig.extra.NOTIFICATION_URL,
};

const ErrorCodes = {
  GRAPHQL_PARSE_FAILED: "GRAPHQL_PARSE_FAILED",
  BAD_USER_INPUT: "BAD_USER_INPUT",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  GRAPHQL_VALIDATION_FAILED: "GRAPHQL_VALIDATION_FAILED",
  BAD_REQUEST: "BAD_REQUEST",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};

const OAUTH = {
  EXPO_CLIENT_ID: Constants.expoConfig.extra.EXPO_CLIENT_ID,
  EXPO_CLIENT_SECRET: Constants.expoConfig.extra.EXPO_CLIENT_SECRET,
  ANDROID_GOOGLE_GUID: Constants.expoConfig.extra.ANDROID_GOOGLE_GUID,
  IOS_GOOGLE_GUID: Constants.expoConfig.extra.IOS_GOOGLE_GUID,
  FACEBOOK_APP_ID: Constants.expoConfig.extra.FACEBOOK_APP_ID,
};

const { ENV } = Constants.expoConfig.extra;

export { URLS, ErrorCodes, OAUTH, ENV };
