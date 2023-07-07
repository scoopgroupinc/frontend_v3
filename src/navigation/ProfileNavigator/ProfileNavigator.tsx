import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenName } from "../../utils/constants";
import UserProfile from "../../containers/home/UserProfile";
import AppNavigator from "../AppNavigator";
import Messages from "../../containers/chat/Messages";
import { useFetchUserData } from "./hooks/useFetchUserData";
import { useNotification } from "./hooks/useNotification";
import { useFetchStaticData } from "./hooks/useFetchStaticData";
import { useUpdateUserLocation } from "../../hooks/useLocation";
import { useGetUserConversationList } from "../../hooks/useGetConversations";

const HomeStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  useNotification();
  useFetchUserData();
  useFetchStaticData();
  useUpdateUserLocation();
  const [, setGetConversations] = useGetUserConversationList();
  setGetConversations(true);

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
    </HomeStack.Navigator>
  );
};

export default ProfileNavigator;
