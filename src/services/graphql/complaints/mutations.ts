import { gql } from "@apollo/client";

export const SAVE_USER_COMPLAINT = gql`
  mutation saveNewCompliants($ComplaintsInput: ComplaintsInput!) {
    saveNewCompliants(complaintsInput: $ComplaintsInput)
  }
`;
