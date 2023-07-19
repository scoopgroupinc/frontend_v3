import { gql } from "@apollo/client";

export const SAVE_USER_COMPLAINT = gql`
  mutation saveNewCompliants($complaintsInput: ComplaintsInput!) {
    saveNewCompliants(complaintsInput: $complaintsInput)
  }
`;
