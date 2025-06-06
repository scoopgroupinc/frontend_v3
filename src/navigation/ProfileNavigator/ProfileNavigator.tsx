import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenName } from "../../utils/constants";
import UserProfile from "../../containers/home/UserProfile";
import AppNavigator from "../AppNavigator";
import Messages from "../../containers/chat/Messages";
import { useFetchStaticData } from "./hooks/useFetchStaticData";
import { useGetUserConversations } from "../../hooks/useGetUserConversations";
import { useGetUserPreference } from "../../hooks/useGetUserPreference";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import UserProfileFeedback from "../../containers/feedback/UserProfileFeedback";
import ShareForFeedback from "../../containers/onboarding/ShareForFeedback";

const HomeStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  useGetUserConversations(true);
  // useGetUserPreference();
  useGetUserProfile();
  useFetchStaticData();
  // useGetUserChoices();

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenName.APP_NAVIGATOR}
    >
      <HomeStack.Screen name={screenName.APP_NAVIGATOR} component={AppNavigator} />
      <HomeStack.Screen name={screenName.USER_PROFILE} component={UserProfile} />
      <HomeStack.Screen name={screenName.MESSAGES} component={Messages} />
      <HomeStack.Screen name={screenName.USER_PROFILE_FEEDBACK} component={UserProfileFeedback} />
      <HomeStack.Screen name={screenName.SHARE_FOR_FEEDBACK} component={ShareForFeedback} />
    </HomeStack.Navigator>
  );
};

export default ProfileNavigator;
