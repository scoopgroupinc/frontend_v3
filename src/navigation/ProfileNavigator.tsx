import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { ProfileEdit } from "../containers/userProfile/profileEdit";
import { screenName } from "../utils/constants";
import { ProfileView } from "../containers/userProfile/profileView";
import { UserProfile } from "../containers/userProfile";

const HomeStack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name={screenName.USER_PROFILE}
        component={UserProfile}
      />
      <HomeStack.Screen
        name={screenName.USER_PROFILE_EDIT}
        component={ProfileEdit}
      />
      <HomeStack.Screen
        name={screenName.USER_PROFILE_VIEW}
        component={ProfileView}
      />
    </HomeStack.Navigator>
  );
};

export default ProfileNavigator;
