import React, { useEffect } from "react";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../utils/constants";
import UserProfile from "../../containers/home/UserProfile";
import AppNavigator from "../AppNavigator";
import Messages from "../../containers/chat/Messages";
import { useFetchStaticData } from "./hooks/useFetchStaticData";
import { useUpdateUserLocation } from "../../hooks/useLocation";
import { useGetUserConversations } from "../../hooks/useGetUserConversations";
import { useGetUserPreference } from "../../hooks/useGetUserPreference";
import { useGetUserPrompts } from "../../hooks/useGetUserPrompts";
import { useGetUserTags } from "../../hooks/useGetUserTags";
import { useGetUserVisuals } from "../../hooks/useGetUserVisuals";
import { useGetUserChoices } from "../../hooks/useGetUserChoices";
import UserProfileFeedback from "../../containers/feedback/UserProfileFeedback";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/features/user/userSlice";

const HomeStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  const { user } = useAppSelector(selectUser);
  const location = user?.location;

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    if (location?.name === screenName.TOGGLE_PROFILE_VIEW) {
      navigation.navigate(screenName.USER_PROFILE, {
        screen: screenName.TOGGLE_PROFILE_VIEW,
        params: {
          value: location?.value,
        },
      });
    }
  }, [location, navigation, user]);

  useGetUserConversations(true);
  useGetUserPreference();
  useGetUserPrompts();
  useGetUserTags();
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
    </HomeStack.Navigator>
  );
};

export default ProfileNavigator;
