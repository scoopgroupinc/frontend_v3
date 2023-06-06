import { gql } from "@apollo/client";

export const DELETE_USER_PROFILE = gql`
  mutation DeleteUser($email: String!, $userId: String!) {
    deleteUser(email: $email, userId: $userId)
  }
`;
