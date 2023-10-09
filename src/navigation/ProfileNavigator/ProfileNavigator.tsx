import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenName } from "../../utils/constants";
import UserProfile from "../../containers/home/UserProfile";
import AppNavigator from "../AppNavigator";
import Messages from "../../containers/chat/Messages";
import { useFetchStaticData } from "./hooks/useFetchStaticData";
import { useUpdateUserLocation } from "../../hooks/useLocation";
import { useGetUserConversations } from "../../hooks/useGetUserConversations";
import { useGetUserPreference } from "../../hooks/useGetUserPreference";
import { useGetUserPrompts } from "../../hooks/useGetUserPrompts";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { useGetUserTags } from "../../hooks/useGetUserTags";
import { useGetUserVisuals } from "../../hooks/useGetUserVisuals";
import UserProfileFeedback from "../../containers/feedback/UserProfileFeedback";
import ShareForFeedback from "../../containers/onboarding/ShareForFeedback";

const HomeStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  useGetUserConversations(true);
  // useGetUserPreference();
  useGetUserPrompts();
  useGetUserTags();
  useGetUserProfile();
  useGetUserVisuals();
  useFetchStaticData();
  useUpdateUserLocation();
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
