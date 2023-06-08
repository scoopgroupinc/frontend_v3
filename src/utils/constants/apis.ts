const URLS = {
  CLIENT_URL: "http://54.242.81.114:4000",
  CHATSERVICE_BASE_URL: "http://scoopchat-dev.eba-cqqr2rky.us-east-1.elasticbeanstalk.com",
  FILE_URL: "http://3.86.224.191:4040",
  // NOTIFICATION_URL: 'http://scoopnotification-dev.eba-imimithn.us-east-1.elasticbeanstalk.com',
};

const ErrorCodes = {
  GRAPHQL_PARSE_FAILED: "GRAPHQL_PARSE_FAILED",
  BAD_USER_INPUT: "BAD_USER_INPUT",
  UNAUTHENTICATED: "UNAUTHENTICATED",
  GRAPHQL_VALIDATION_FAILED: "GRAPHQL_VALIDATION_FAILED",
  BAD_REQUEST: "BAD_REQUEST",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};

export { URLS, ErrorCodes };
