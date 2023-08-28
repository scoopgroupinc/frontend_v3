/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import VoteNavigator from "./VoteNavigator";
import { screenName } from "../utils/constants";
import { useAppSelector } from "../store/hooks";
import { Colors } from "../utils";
// import VoteOnboardNavigator from "./VoteOnboardNavigator";
import {
  selectLocation,
  selectUser,
  selectUserIsOnboarded,
} from "../store/features/user/userSlice";
import { OnboardNavigator } from "./OnboardNavigator";
import { Home } from "../containers/home";
import ChatNavigator from "./ChatNavigator";
import { FloatingNavButton } from "../components/molecule/FloatingNav/FloatingNavButton";
import ShareForFeedback from "../containers/onboarding/ShareForFeedback";

const AppTabStack = createBottomTabNavigator();

const AppNavigator = () => {
  const { user } = useAppSelector(selectUser);
  const location = user?.location;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const isOnboarded = useAppSelector(selectUserIsOnboarded);
  // const isOnboarded = true;
  // const firstTime = true;

  useEffect(() => {
    if (location) {
      navigation.navigate(screenName.USER_PROFILE);
    }
  }, [location, navigation]);

  // if (firstTime) {
  //   return <ShareForFeedback />;
  // }

  return isOnboarded ? (
    <AppTabStack.Navigator
      initialRouteName={screenName.PROFILE_HOME}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: "20%",
          right: "20%",
          backgroundColor: Colors.WHITE,
          borderRadius: 100,
          height: 42,
          display: "flex",
          flexWrap: "wrap",
          width: "auto",
          shadowColor: "#000",
          shadowOffset: {
            // for iOS
            width: 0,
            height: 3,
          },
          elevation: 5, // for Android
          shadowOpacity: 0.25, // for iOS
          shadowRadius: 3.5, // for iOS
        },
      }}
    >
      <AppTabStack.Screen
        name={screenName.VOTE}
        // component={isVoteOnboarded ? VoteNavigator : VoteOnboardNavigator}
        component={VoteNavigator}
        options={{
          tabBarItemStyle: {
            height: 40,
          },
          tabBarIcon: ({ focused }) => {
            const icon = "thumbs-up";
            return <FloatingNavButton icon={icon} focused={focused} />;
          },
        }}
      />
      <AppTabStack.Screen
        name={screenName.PROFILE_HOME}
        component={Home}
        options={{
          tabBarItemStyle: {
            height: 40,
          },
          tabBarIcon: ({ focused }) => {
            const icon = "person-outline";
            return <FloatingNavButton icon={icon} focused={focused} />;
          },
        }}
      />

      <AppTabStack.Screen
        name={screenName.CHAT_NAVIGATOR}
        component={ChatNavigator}
        options={{
          title: "Conversations",
          tabBarItemStyle: {
            height: 40,
          },
          tabBarIcon: ({ focused }) => {
            const icon = "chatbox-ellipses-outline";
            return <FloatingNavButton icon={icon} focused={focused} />;
          },
        }}
      />
    </AppTabStack.Navigator>
  ) : (
    <OnboardNavigator />
  );
};

export default AppNavigator;
