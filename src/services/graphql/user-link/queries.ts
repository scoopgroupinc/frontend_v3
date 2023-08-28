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
        userTags {
          id
          userId
          tagName
          tagType
        }
      }
    }
  }
`;
