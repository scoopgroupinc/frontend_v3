import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as Linking from "expo-linking";
import { useLazyQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import AuthNavigator from "./AuthNavigator";
import screenName from "../utils/constants/screenName";
import ProfileNavigator from "./ProfileNavigator/ProfileNavigator";
import { navigationRef } from "./RootNavigation";
import { decryptData } from "../utils/helpers";
import FeedbackNavigator from "./FeedbackNavigator";
import { GET_USER_PROFILE_BY_LINK_ID } from "../services/graphql/user-link/queries";
import { setFeedbackUser } from "../store/features/feedback/feedbackSlice";
import ErrorScreen from "../containers/ErrorScreen";

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

  const [loadLink, { data: linkData }] = useLazyQuery(GET_USER_PROFILE_BY_LINK_ID, {
    variables: {
      id: sharedLink?.id,
    },
  });
  useEffect(() => {
    if (sharedLink) {
      loadLink().then(() => {
        setSharedLink(null);
        navigationRef.current?.navigate(screenName.FEEDBACK_NAVIGATOR, {
          link: { sharedLink },
        });
      });
    }
  }, [sharedLink, loadLink]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (linkData?.getUserProfileByLinkId) {
      dispatch(
        setFeedbackUser({
          feedbackUser: linkData.getUserProfileByLinkId,
        })
      );
    }
  }, [linkData, sharedLink, dispatch]);

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
          <Stack.Screen name={screenName.ERROR_SCREEN} component={ErrorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigator;
