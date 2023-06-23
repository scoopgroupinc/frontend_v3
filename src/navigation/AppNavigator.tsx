/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from "react";
import axios from "axios";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import VoteNavigator from "./VoteNavigator";
import { screenName } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Colors } from "../utils";
// import VoteOnboardNavigator from "./VoteOnboardNavigator";
import { selectUser, setUserVisuals } from "../store/features/user/userSlice";
import { URLS } from "../utils/constants/apis";
import { OnboardNavigator } from "./OnboardNavigator";
import { GET_PROMPTS } from "../services/graphql/profile/queries";
import { setAllPrompts } from "../store/features/prompts/promptsSlice";
import { Home } from "../containers/home";
import ChatNavigator from "./ChatNavigator";

const AppTabStack = createBottomTabNavigator();

const AppNavigator = () => {
  const user = useAppSelector(selectUser);
  const userId = user?.userId;
  const { isOnboarded } = user || {};

  const dispatch = useAppDispatch();

  const { data: promptsResult } = useQuery(GET_PROMPTS);

  useEffect(() => {
    const getVisuals = async () => {
      axios
        .get(`${URLS.FILE_URL}/api/v1/visuals/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        })
        .then((res) => {
          dispatch(
            setUserVisuals({
              userVisuals: res.data,
            })
          );
        })
        .catch(() => {});
    };
    getVisuals();
  }, [userId, dispatch]);

  useEffect(() => {
    if (promptsResult) {
      dispatch(
        setAllPrompts({
          allPrompts: promptsResult.getPrompts,
        })
      );
    }
  }, [promptsResult, dispatch]);

  return !isOnboarded ? (
    <AppTabStack.Navigator
      initialRouteName={screenName.HOME}
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
        // component={voteOnboard ? VoteNavigator : VoteOnboardNavigator}
        component={VoteNavigator}
        options={{
          // tabBarStyle: voteOnboard
          //   ? {
          //       overflow: "hidden",
          //       backgroundColor: "#ffffff",
          //       position: "absolute",
          //       bottom: 25,
          //       left: "20%",
          //       right: "20%",
          //       elevation: 0,
          //       borderRadius: 15,
          //       height: 80,
          //       borderTopWidth: 1,
          //       borderBottomWidth: 1,
          //       borderLeftWidth: 1,
          //       borderRightWidth: 1,
          //       borderTopColor: Colors.RUST,
          //       borderLeftColor: Colors.RUST,
          //       borderRightColor: Colors.RUST,
          //       borderBottomColor: Colors.RUST,
          //     }
          //   : { display: "none" },
          tabBarItemStyle: {
            height: 70,
          },
          tabBarInactiveBackgroundColor: "white",
          tabBarIcon: ({ focused }) => (
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
          ),
        }}
      />
      <AppTabStack.Screen
        name={screenName.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
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
          ),
          tabBarItemStyle: {
            height: 70,
          },
        }}
      />

      <AppTabStack.Screen
        name={screenName.CHAT_NAVIGATOR}
        component={ChatNavigator}
        options={{
          title: "Conversations",
          tabBarItemStyle: {
            height: 70,
          },
          tabBarIcon: ({ focused }) => (
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
          ),
        }}
      />
    </AppTabStack.Navigator>
  ) : (
    <OnboardNavigator />
  );
};

export default AppNavigator;
