/* eslint-disable no-restricted-syntax */
import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { Alert } from "react-native";
import { setContext } from "@apollo/client/link/context";
import { ErrorCodes, URLS } from "../../utils/constants/apis";
import { getStringData } from "../../utils/storage";
import { navigationRef } from "../../navigation/RootNavigation";
import { screenName } from "../../utils/constants";

export const getToken = async () => getStringData("userToken");
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions?.code) {
        case ErrorCodes.UNAUTHENTICATED:
          console.log("UNAUTHENTICATED");
          break;
        case ErrorCodes.BAD_USER_INPUT:
          console.log("BAD_USER_INPUT", err.message);
          break;
        case ErrorCodes.BAD_REQUEST:
          console.log("BAD_REQUEST");
          Alert.alert("Error", err.message);
          break;
        case ErrorCodes.INTERNAL_SERVER_ERROR:
          console.log("INTERNAL_SERVER_ERROR", err);
          if (err.message.includes("UserLink is inactive")) {
            navigationRef.current?.navigate(screenName.ERROR_SCREEN, {
              error: err.message,
            });
          }
          break;
        case ErrorCodes.GRAPHQL_VALIDATION_FAILED:
          console.log("GRAPHQL_VALIDATION_FAILED", err.message);
          break;
        case ErrorCodes.GRAPHQL_PARSE_FAILED:
          console.log("GRAPHQL_PARSE_FAILED", err.message);
          break;
        default:
          console.log("DEFAULT");
          break;
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authLink, new HttpLink({ uri: `${URLS.CLIENT_URL}/graphql` })]),
});
