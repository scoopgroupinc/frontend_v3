import React from "react";
import VoteNavigator from "./VoteNavigator";
import { screenName } from "../utils/constants";
import ProfileNavigator from "./ProfileNavigator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { Colors } from "../utils";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Conversations from "../containers/chat/Conversations";
import VoteOnboardNavigator from "./VoteOnboardNavigator";
import { AppButton } from "../components/atoms/AppButton";
import { logout } from "../store/features/user/userSlice";

const AppTabStack = createBottomTabNavigator();

const AppNavigator = () => {
  const { user } = useAppSelector((state) => state.appUser);
  const { voteOnboard } = user;
  const dispatch = useAppDispatch();
  return (
    <AppTabStack.Navigator
      initialRouteName={screenName.PROFILE}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          overflow: "hidden",
          backgroundColor: "#ffffff",
          position: "absolute",
          bottom: 25,
          left: "20%",
          right: "20%",
          elevation: 0,
          borderRadius: 15,
          height: 80,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopColor: Colors.RUST,
          borderLeftColor: Colors.RUST,
          borderRightColor: Colors.RUST,
          borderBottomColor: Colors.RUST,
        },
      }}
    >
      <AppTabStack.Screen
        name={screenName.VOTE}
        component={voteOnboard ? VoteNavigator : VoteOnboardNavigator}
        options={{
          tabBarStyle: voteOnboard
            ? {
                overflow: "hidden",
                backgroundColor: "#ffffff",
                position: "absolute",
                bottom: 25,
                left: "20%",
                right: "20%",
                elevation: 0,
                borderRadius: 15,
                height: 80,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderTopColor: Colors.RUST,
                borderLeftColor: Colors.RUST,
                borderRightColor: Colors.RUST,
                borderBottomColor: Colors.RUST,
              }
            : { display: "none" },
          tabBarItemStyle: {
            height: 70,
          },
          tabBarInactiveBackgroundColor: "white",
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  borderRadius: 50,
                  backgroundColor: focused ? Colors.RUST : "white",
                  padding: 20,
                  marginVertical: focused ? 5 : 0,
                }}
              >
                <FontAwesome
                  name="thumbs-o-up"
                  size={focused ? 22 : 32}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          },
        }}
      />
      <AppTabStack.Screen
        name={screenName.PROFILE}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: focused ? Colors.RUST : "white",
                  flex: 1,
                  borderRadius: 50,
                  padding: 20,
                  marginVertical: focused ? 5 : 0,
                }}
              >
                <Ionicons
                  name="person-outline"
                  size={focused ? 22 : 32}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          },
          tabBarItemStyle: {
            height: 70,
          },
        }}
      >
        {/* {() => <ProfileScreen openPanel={() => {}} />} */}
        {() => (
          <View
            style={{
              flex: 1,
              backgroundColor: "tomato",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Profile Screen</Text>
            <AppButton
              title="Logout"
              onPress={() => {
                dispatch(logout());
              }}
            />
          </View>
        )}
      </AppTabStack.Screen>

      <AppTabStack.Screen
        name={screenName.CONVERSATIONS}
        component={Conversations}
        options={{
          title: "Conversations",
          headerShown: true,
          tabBarItemStyle: {
            height: 70,
          },
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  borderRadius: 50,
                  backgroundColor: focused ? Colors.RUST : "white",
                  padding: 20,
                  marginVertical: focused ? 5 : 0,
                }}
              >
                <Ionicons
                  name="md-chatbox-ellipses-outline"
                  size={focused ? 22 : 32}
                  color={focused ? "white" : "black"}
                />
              </View>
            );
          },
        }}
      />
    </AppTabStack.Navigator>
  );
};

export default AppNavigator;
