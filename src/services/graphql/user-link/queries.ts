import { gql } from "@apollo/client";

export const GET_USER_PROFILE_BY_LINK_ID = gql`
query GetUserProfileByShareLinkId($id: String!) {
  getUserProfileByShareLinkId(id: $id) {
    userId
    createdAt
    profilePhoto
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
      tagName
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
