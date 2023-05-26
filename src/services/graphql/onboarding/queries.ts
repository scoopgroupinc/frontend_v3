import {gql} from '@apollo/client'

export const GET_USER_GENDER = gql`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      gender
    }
  }
`

export const GET_PROMPTS_ORDER = gql`
  query GET_PROMPTS_ORDER($userId: String!) {
    getUserPromptsOrder(userId: $userId) {
      id
      createdAt
      userId
      promptId
      prompt
      answer
    }
  }
`

export const GET_PROMPTS = gql`
  query GET_PROMPTS {
    getPrompts(id: "", promptType: "") {
      id
      prompt
      type
      sample_answer
    }
  }
`

export const GET_USER_HEIGHT = gql`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      height
    }
  }
`

export const GET_USER_BIRTHDAY = gql`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      userId
      birthday
    }
  }
`

export const GET_USER_NAMES = gql`
  query getUser($userId: String!) {
    getUser(userId: $userId) {
      userId
      firstName
      lastName
    }
  }
`

export const GET_USER_PROMPTS = gql`
  query GET_USER_PROMPTS($userId: String!) {
    getUserPrompts(userId: $userId) {
      id
      userId
      promptId
      prompt
      answer
    }
  }
`
