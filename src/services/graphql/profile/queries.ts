import { gql } from "@apollo/client";

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

export const GET_PROMPTS = gql`
  query GET_PROMPTS {
    getPrompts(id: "", promptType: "") {
      id
      prompt
      type
      sample_answer
    }
  }
`;

export const GET_PROMPTS_ORDER = gql`
  query getUserPromptsOrder($userPromptsOrder: IGetPromptOrder!) {
    getUserPromptsOrder(userPromptsOrder: $userPromptsOrder) {
      id
      createdAt
      userId
      promptId
      prompt
      answer
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

export const GET_USER_PROFILE = gql`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
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
      emoji
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
  query getRatingByContent($RatingInput: [IGetRatingInput!]!) {
    getRatingByContent(ratingInput: $RatingInput) {
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
