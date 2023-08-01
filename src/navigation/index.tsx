import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as Linking from "expo-linking";
import { useAppSelector } from "../store/hooks";
import AuthNavigator from "./AuthNavigator";
import screenName from "../utils/constants/screenName";
import ProfileNavigator from "./ProfileNavigator/ProfileNavigator";
import { navigationRef } from "./RootNavigation";
import ShareForFeedback from "../containers/onboarding/ShareForFeedback";
import FeedbackSplash from "../containers/feedback/Splash";
import FeedbackImpressions from "../containers/feedback/Impressions";
import UnAuthorizedFeedbackUser from "../containers/feedback/UnAuthorizedFeedbackUser";
import AuthorizedFeedbackUser from "../containers/feedback/AuthorizedFeedbackUser";
import ProfileFeedback from "../containers/feedback/ProfileFeedback";

const Stack = createNativeStackNavigator();
const prefix = Linking.createURL("/");

const Navigator = () => {
  const linking = {
    prefixes: ["https://www.scoop.love/app/", "scoop://"],
  };

  const { user } = useAppSelector((state) => state.appUser);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef} linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* <Stack.Screen
            name={screenName.AUTHORIZEDFEEDBACKUSER}
            component={UnAuthorizedFeedbackUser}
          /> */}
          <Stack.Screen name={screenName.AUTH_NAVIGATOR} component={ProfileFeedback} />
          {/* {user ? (
            <Stack.Screen name={screenName.PROFILE_NAVIGATOR} component={ProfileNavigator} />
          ) : (
            <Stack.Screen name={screenName.AUTH_NAVIGATOR} component={AuthNavigator} />
          )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigator;
