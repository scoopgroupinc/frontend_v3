import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as Linking from "expo-linking";
import { useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import AuthNavigator from "./AuthNavigator";
import screenName from "../utils/constants/screenName";
import ProfileNavigator from "./ProfileNavigator/ProfileNavigator";
import { navigationRef } from "./RootNavigation";
import { decryptData } from "../utils/helpers";
import FeedbackNavigator from "./FeedbackNavigator";
import ErrorScreen from "../containers/ErrorScreen";
import { GET_USER_PROFILE_BY_LINK_ID } from "../services/graphql/user-link/mutations";
import { getObjectData } from "../utils/storage";
import { setUser } from "../store/features/user/userSlice";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [sharedLink, setSharedLink] = useState<any>(null);
  const linking = {
    prefixes: ["https://www.scoop.love/app/", "scoop://"],
  };

  Linking.addEventListener("url", (url) => {
    const encryptedData = url.url.split("/app/")[1];
    const decryptedData = decryptData(encryptedData);
    setSharedLink(decryptedData);
  });

  const { user } = useAppSelector((state) => state.appUser);
  const [loadLink] = useMutation(GET_USER_PROFILE_BY_LINK_ID, {
    variables: {
      id: sharedLink?.id,
    },
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (sharedLink?.id) {
      loadLink()
        .then((res) => {
          if (res?.data?.getUserProfileByLinkId) {
            navigationRef.current?.navigate(screenName.FEEDBACK_NAVIGATOR, {
              link: { sharedLink },
            });
          }
        })
        .catch((err) => {});
    }
  }, [sharedLink, loadLink, dispatch]);

  useEffect(() => {
    // Check for an initial deep link when the app starts
    Linking.getInitialURL().then((url) => {
      if (url) {
        const encryptedData = url.split("/app/")[1];
        const decryptedData = decryptData(encryptedData);
        setSharedLink(decryptedData);
      }
    });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { user } = await getObjectData("user");
      if (user)
        dispatch(
          setUser({
            user,
          })
        );
    };
    getUser();
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef} linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user ? (
            <Stack.Screen name={screenName.PROFILE_NAVIGATOR} component={ProfileNavigator} />
          ) : (
            <Stack.Screen name={screenName.AUTH_NAVIGATOR} component={AuthNavigator} />
          )}
          <Stack.Group>
            <Stack.Screen
              navigationKey={user ? screenName.PROFILE_NAVIGATOR : screenName.AUTH_NAVIGATOR}
              name={screenName.FEEDBACK_NAVIGATOR}
              component={FeedbackNavigator}
            />
            <Stack.Screen name={screenName.ERROR_SCREEN} component={ErrorScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigator;
