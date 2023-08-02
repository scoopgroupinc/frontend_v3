import { gql } from "@apollo/client";

// id a uuid
export const GET_USER_SHARE_PROFILE_LINK = gql`
  mutation GetUserShareProfileLink($userId: String!) {
    getUserShareProfileLink(userId: $userId) {
      id
      userId
      createdAt
      state
      templateId
    }
  }
`;

export const DEACTIVATE_PROFILE_LINK = gql`
mutation DeactivateProfileLink($id: String!) {    
  updateUserLinkState(id: $id, state: USER_LINK_STATE.INACTIVE) {
        id
        userId
        createdAt
        state
        templateId
        }
    }
`;

export const ACTIVATE_PROFILE_LINK = gql`
mutation ActivateProfileLink($id: String!) {    
  updateUserLinkState(id: $id, state: USER_LINK_STATE.ACTIVE) {
        id
        userId
        createdAt
        state
        templateId
        }
    }
`;

