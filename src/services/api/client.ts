import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ErrorCodes, URLS } from "../../utils/constants/apis";
import * as RootNavigation from "../../navigation/RootNavigation";
import { screenName } from "../../utils/constants";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions?.code) {
        case ErrorCodes.UNAUTHENTICATED:
          RootNavigation.navigate(screenName.LOGIN);
          break;
        case ErrorCodes.BAD_USER_INPUT:
          // show error message
          break;
        case ErrorCodes.BAD_REQUEST:
          // show error message
          break;
        case ErrorCodes.INTERNAL_SERVER_ERROR:
          // show error message
          break;
        case ErrorCodes.GRAPHQL_VALIDATION_FAILED:
          // show error message
          break;
        case ErrorCodes.GRAPHQL_PARSE_FAILED:
          // show error message
          break;
        default:
          break;
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({ uri: `${URLS.CLIENT_URL}/graphql` });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});
