import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as Linking from "expo-linking";
import { useAppSelector } from "../store/hooks";
import AuthNavigator from "./AuthNavigator";
import screenName from "../utils/constants/screenName";
import ProfileNavigator from "./ProfileNavigator/ProfileNavigator";
import { navigationRef } from "./RootNavigation";
import RequestFeedbackProfile from "../containers/feedback/RequestFeedbackProfile";
import GoDeeper from "../containers/feedback/GoDeeper";
import ShareForFeedback from "../containers/onboarding/ShareForFeedback";
import UserProfileFeedback from "../containers/feedback/UserProfileFeedback";
import { decryptData } from "../utils/helpers";
import FeedbackNavigator from "./FeedbackNavigator";

const Stack = createNativeStackNavigator();
// const prefix = Linking.createURL("/");

const useIniitalLink = () => {
  const [url, setUrl] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getUrlAsync = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        setUrl(initialUrl);
      } catch (e) {
        setError(e);
      }
    };

    getUrlAsync();
  }, []);

  return { url, error };
};

const Navigator = () => {
  const [sharedLink, setSharedLink] = useState<any>(null);
  const linking = {
    prefixes: ["https://www.scoop.love/app/", "scoop://"],
  };

  const { url: initialUrl, error } = useIniitalLink();

  Linking.addEventListener("url", (url) => {
    const encryptedData = url.url.split("/app/")[1];
    const decryptedData = decryptData(encryptedData);
    setSharedLink(decryptedData);
  });

  const { user } = useAppSelector((state) => state.appUser);

  useEffect(() => {
    if (sharedLink) {
      navigationRef.current?.navigate(screenName.FEEDBACK_NAVIGATOR, {
        link: { sharedLink },
      });
    }
  }, [sharedLink]);

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
          <Stack.Screen name={screenName.FEEDBACK_NAVIGATOR} component={FeedbackNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigator;
