import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { ErrorCodes, URLS } from "../../utils/constants/apis";
import * as RootNavigation from "../../navigation/RootNavigation";
import { screenName } from "../../utils/constants";
import { Alert } from "react-native";
import { getStringData } from "../../utils/storage";
import { setContext } from "@apollo/client/link/context";

const getToken = async () => {
  const token = getStringData("userToken");
  return token;
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err.extensions?.code) {
        case ErrorCodes.UNAUTHENTICATED:
          RootNavigation.navigate(screenName.LOGIN);
          //check why it does not redirect to login
          break;
        case ErrorCodes.BAD_USER_INPUT:
          // show error message
          break;
        case ErrorCodes.BAD_REQUEST:
          // show error message
          Alert.alert("Error", err.message);
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
  link: from([
    errorLink,
    authLink,
    new HttpLink({ uri: `${URLS.CLIENT_URL}/graphql` }),
  ]),
});
