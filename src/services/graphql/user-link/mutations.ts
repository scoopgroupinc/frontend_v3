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
    updateUserLinkState(id: $id, state: "inactive") {
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
    updateUserLinkState(id: $id, state: "active") {
      id
      userId
      createdAt
      state
      templateId
    }
  }
`;

export const GET_USER_PROFILE_BY_LINK_ID = gql`
  mutation GetUserProfileByLinkId($id: String!) {
    getUserProfileByLinkId(id: $id) {
      userId
      createdAt
      profilePhoto
      displayName
      birthday
      height
      gender
      locationId
      jobTitle
      company
      homeTown
      school
      promptIds
      prompts {
        id
        createdAt
        userId
        promptId
        answer
      }
      tags {
        id
        userId
        tagType
        visible
        emoji
        userTags {
          id
          userId
          tagName
          tagType
        }
      }
      visuals {
        id
        createdAt
        userId
        videoOrPhoto
        blobName
        visualPromptId
        deletedAt
        description
        isVisible
      }
    }
  }
`;
