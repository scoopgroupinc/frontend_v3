import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";
import { UserProfileEdit } from "../containers/home/UserProfileEdit";
import { screenName } from "../utils/constants";
import { UserProfileView } from "../containers/home/UserProfileView";
import UserProfile from "../containers/home/UserProfile";
import AppNavigator from "./AppNavigator";
import Messages from "../containers/chat/Messages";
import { useNotifications } from "../hooks/useNotification";

const HomeStack = createStackNavigator();

const ProfileNavigator = () => {
  const { handleNotificationResponse } = useNotifications();

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );

    return () => {
      if (responseListener) Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenName.APP_NAVIGATOR}
    >
      <HomeStack.Screen name={screenName.APP_NAVIGATOR} component={AppNavigator} />
      <HomeStack.Screen name={screenName.USER_PROFILE} component={UserProfile} />
      <HomeStack.Screen name={screenName.USER_PROFILE_EDIT} component={UserProfileEdit} />
      <HomeStack.Screen name={screenName.USER_PROFILE_VIEW} component={UserProfileView} />
      <HomeStack.Screen
        options={{
          headerShown: false,
        }}
        name={screenName.MESSAGES}
        component={Messages}
      />
    </HomeStack.Navigator>
  );
};

export default ProfileNavigator;
