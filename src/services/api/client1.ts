import { Alert, AlertButton, AlertOptions } from "react-native";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import * as RootNavigation from "../../navigation/RootNavigation";
import { URLS } from "../../utils/constants/apis";
import { getStringData } from "../../utils/storage";
import { screenName } from "../../utils/constants";

const link = new HttpLink({
  uri: `${URLS.CLIENT_URL}/graphql`,
});
const cache = new InMemoryCache();

export const getToken = async () => {
  const token = getStringData("token");
  return token;
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ extensions, message, locations, path }) => {
      if (message.includes("Unauthorized")) {
        Alert.alert(message);
        RootNavigation.navigate(screenName.LOGIN);
        // HANDLE LOGOUT LOGIC
      } else {
        Alert.alert(message);
        // Alert.alert(
        //   Array.isArray(extensions?.response?.message)
        //     ? extensions?.response?.message[0]
        //     : extensions?.response?.message
        // )
      }
    });
  }

  if (networkError) {
    // Alerts when the network connection fails
    // networkErrorClosure(Alert.alert, networkError.message);
    // Alert.alert(networkError.message);
  }
});

const networkErrorClosure = (
  callback: (
    title: string,
    message?: string | undefined,
    buttons?: AlertButton[] | undefined,
    options?: AlertOptions | undefined
  ) => void,
  alertText: string
) => {
  let calls = 0;
  if (calls > 0) return;
  else {
    callback(alertText);
    calls++;
    return;
  }
};

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache,
  link: errorLink.concat(authLink.concat(link)),
  connectToDevTools: true,
});

export default client;
