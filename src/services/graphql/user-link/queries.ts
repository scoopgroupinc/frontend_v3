import { gql } from "@apollo/client";

export const GET_USER_PROFILE_BY_LINK_ID = gql`
  query GetUserProfileByLinkId($id: String!) {
    getUserProfileByLinkId(id: $id) {
      userId
      createdAt
      profilePhoto
      displayName
      birthday
      height
      gender
      locationId
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
