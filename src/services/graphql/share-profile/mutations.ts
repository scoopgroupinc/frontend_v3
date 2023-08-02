import { gql } from "@apollo/client";

//   const [createShareProfileFeedback, { loading, error, data }] = useMutation(
//     CREATE_SHARE_PROFILE_FEEDBACK
//   );

//   // Handle the form submission or data creation
//   const handleSubmit = async () => {
//     try {
//       const result = await createShareProfileFeedback({
//         variables: {
//           feedbackGroupInput: { userId: 'user_id_here', raterId: 'rater_id_here' },
//           personalityFeedbacksInput: [
//             { personality: 'personality1' },
//             { personality: 'personality2' },
//             // Add more personalities as needed
//           ],
//           profileFeedbackInput: {
//             description: 'Profile feedback description',
//             name: 'Profile feedback name',
//           },
//         },
//       });
//       // Handle success or do something with the data
//       console.log(result.data.createShareProfileFeedback);
//     } catch (error) {
//       // Handle error
//       console.error(error);
//     }
//   };

export const CREATE_SHARE_PROFILE_FEEDBACK = gql`
  mutation CreateShareProfileFeedback(
    $feedbackGroupInput: FeedbackGroupInput!
    $personalityFeedbacksInput: [PersonalityFeedbackInput!]!
    $profileFeedbackInput: ProfileFeedbackInput!
  ) {
    createShareProfileFeedback(
      feedbackGroupInput: $feedbackGroupInput
      personalityFeedbacksInput: $personalityFeedbacksInput
      profileFeedbackInput: $profileFeedbackInput
    ) {
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

// use when user logins after submitting feedback
export const UPDATE_SHARE_PROFILE_RATER_ID = gql`
  mutation UpdateShareProfileRaterId($id: String!, $raterId: String) {
    updateShareProfileRaterId(id: $id, raterId: $raterId) {
      id
      userId
      createdAt
      state
      templateId
    }
  }
`;
