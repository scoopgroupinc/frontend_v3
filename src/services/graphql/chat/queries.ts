import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      userId
      firstName
      lastName
    }
  }
`;

export const IS_USER_BLOCKED=gql`
  query isUserBlocked($userId: String!, $userIds:[String]){
    isUserBlocked(userId: $userId, userIds:userIds){
      userId
    }
  }
`;