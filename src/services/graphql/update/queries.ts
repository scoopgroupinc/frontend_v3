import { gql } from "@apollo/client";

export const GET_META_DETAILS = gql`
  query getMetaDetails {
    getMetaDetails {
      updateIOS
      updateAndroid
      forceUpdateIOS
      forceUpdateAndroid
      updateTitleAndroid
      updateTitleIOS
      updateButtonAndroid
      updateButtonIOS
      updateTextAndroid
      updateTextIOS
      closeUpdateButtonAndroid
      closeUpdateButtonIOS
    }
  }
`;
