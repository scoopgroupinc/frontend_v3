import { gql } from "@apollo/client";
// Call the query function with the required variables
//   const { loading, error, data } = useQuery(GET_SHARE_PROFILE_FEEDBACK, {
//     variables: {
//       userId,
//     },
//   });
export const GET_SHARE_PROFILE_FEEDBACK = gql`
  query GetShareProfileFeedback($userId: String!) {
    getShareProfileFeedback(userId: $userId) {
      id
      createdAt
      userId
      raterId
      templateId
      profileFeedback {
        id
        createdAt
        description
        name
        feedbackGroupId
      }
      personalityFeedbacks {
        id
        createdAt
        personality
        feedbackGroupId
      }
    }
  }
`;
