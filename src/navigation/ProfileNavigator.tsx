import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProfileEdit } from "../containers/home/UserProfileEdit";
import { screenName } from "../utils/constants";
import { UserProfileView } from "../containers/home/UserProfileView";
import { Home } from "../containers/home";
import UserProfile from "../containers/home/UserProfile";

const HomeStack = createStackNavigator();

function ProfileNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name={screenName.HOME} component={Home} />
      <HomeStack.Screen name={screenName.USER_PROFILE} component={UserProfile} />
      <HomeStack.Screen name={screenName.USER_PROFILE_EDIT} component={UserProfileEdit} />
      <HomeStack.Screen name={screenName.USER_PROFILE_VIEW} component={UserProfileView} />
    </HomeStack.Navigator>
  );
}

export default ProfileNavigator;
