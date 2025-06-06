import { gql } from "@apollo/client";

export const GET_USER_ANSWERED_PROMPTS = gql`
  query getUserAnsweredPrompts($userId: String!) {
    getUserAnsweredPrompts(userId: $userId) {
      userPrompts {
        id
        createdAt
        userId
        promptId
        prompt
        answer
      }
      promptIds
    }
  }
`;

export const GET_PROMPTS = gql`
  query getPrompts {
    getPrompts(id: "", promptType: "") {
      id
      prompt
      type
      sample_answer
    }
  }
`;

// export const GET_PROMPTS_ORDER = gql`
//   query getUserPromptsOrder($userPromptsOrder: GetPromptOrderInput!) {
//     getUserPromptsOrder(userPromptsOrder: $userPromptsOrder) {
//       userPrompts {
//         id
//         createdAt
//         userId
//         promptId
//         prompt
//         answer
//       }
//       promptIds
//     }
//   }
// `;

export const GET_DISPLAYED_PROMPTS = gql`
  query getUserPromptsDisplayed($userId: String!) {
    getUserPromptsDisplayed(userId: $userId) {
      userPrompts {
        id
        createdAt
        userId
        promptId
        prompt
        answer
      }
      promptIds
    }
  }
`;

export const GET_USER = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      userId
      firstName
      lastName
      email
      phoneNumber
      isOnboarded
    }
  }
`;

export const GET_USER_PREFERENCE = gql`
  query getUserPreference($userId: String!) {
    getUserPreference(userId: $userId) {
      userId
      createdAt
      heightRange
      ageRange
      gender
      distance
      ethnicityPreferences
      sportsPreferences
    }
  }
`;

export const GET_USER_NAMES = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      userId
      firstName
      lastName
    }
  }
`;

export const GET_BIRTHDAY_HEIGHT = gql`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      userId
      birthday
      height
    }
  }
`;

export const GET_TAGS = gql`
  query getTags {
    getTags(tagType: "") {
      id
      name
      emoji
      type
      order
      visible
    }
  }
`;

export const GET_USER_TAGS_TYPE_VISIBLE = gql`
  query getAllUserTagsTypeVisible($userId: String!) {
    getAllUserTagsTypeVisible(userId: $userId) {
      userId
      tagType
      visible
      userTags {
        id
        userId
        tagName
        tagType
        tagId
      }
    }
  }
`;

export const GET_CRITERIAS = gql`
  query getCriterias($criteriaType: String!) {
    getCriterias(criteriaType: $criteriaType) {
      id
      title
      description
      type
    }
  }
`;

export const GET_USER_CHOICES = gql`
  query getUserChoices($userId: String!) {
    getUserChoices(userId: $userId) {
      id
      swiperId
      shownUserId
      gender
      choiceName
      prompt {
        id
        userId
        promptId
        prompt
        answer
      }
      profile {
        id
        userId
        emoji
        tagType
        visible
        userTags {
          id
          userId
          tagName
          tagType
          tagId
        }
      }
      visual {
        id
        userId
        visualPromptId
        videoOrPhoto
        description
        isVisible
      }
    }
  }
`;

export const GET_RATING_BY_CONTENT = gql`
  query getRatingByContent($ratingInput: [GetRatingInput!]!) {
    getRatingByContent(ratingInput: $ratingInput) {
      contentId
      type
      Trustworty
      Smart
      Attractive
      well_written
      Informative
      Engaging
      total
      counts
      comments {
        comment
        endTime
      }
    }
  }
`;
export const GET_RATING_CONTENT_COMMENTS = gql`
  query getRatingContentComments($contentId: String!) {
    getRatingContentComments(contentId: $contentId) {
      comment
      endTime
    }
  }
`;

export const GET_ARCHIVED_USER_PROMPTS = gql`
  query getUserPrompts($userId: String!) {
    getUserPrompts(userId: $userId) {
      id
      userId
      promptId
      prompt
      answer
    }
  }
`;

export const GET_USER_LOCATION = gql`
  query getUserLocation($userId: String!) {
    getUserLocation(userId: $userId) {
      userId
      latitude
      longitude
      addressLine1
      addressLine2
      stateProvince
      country
      zipPostal
    }
  }
`;

export const GET_FULL_PROFILE = gql`
  query GetFullProfile($userId: String!) {
    getFullProfile(userId: $userId) {
      userId
      createdAt
      displayName
      profilePhoto
      birthday
      height
      gender
      location {
        latitude
        longitude
        addressLine1
        addressLine2
        stateProvince
        country
        city
        zipPostal
      }
      promptIds
      prompts {
        id
        createdAt
        userId
        promptId
        answer
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
      tags {
        tagType
        visible
        userId
        id
        userTags {
          id
          userId
          tagName
          tagType
          tagId
        }
      }
    }
  }
`;
