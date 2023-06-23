import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProfileEdit } from "../../containers/home/UserProfileEdit";
import { screenName } from "../../utils/constants";
import { UserProfileView } from "../../containers/home/UserProfileView";
import UserProfile from "../../containers/home/UserProfile";
import AppNavigator from "../AppNavigator";
import Messages from "../../containers/chat/Messages";
import { useFetchUserData } from "./hooks/useFetchUserData";
import { useNotification } from "./hooks/useNotification";
import { useFetchStaticData } from "./hooks/useFetchStaticData";

const HomeStack = createStackNavigator();

const ProfileNavigator = () => {
  useNotification();
  useFetchUserData();
  useFetchStaticData();

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
