import React, { useEffect } from "react";
import axios from "axios";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import VoteNavigator from "./VoteNavigator";
import { screenName } from "../utils/constants";
import ProfileNavigator from "./ProfileNavigator";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Colors } from "../utils";
import Conversations from "../containers/chat/Conversations";
import VoteOnboardNavigator from "./VoteOnboardNavigator";
import { setUserVisuals } from "../store/features/user/userSlice";
import { URLS } from "../utils/constants/apis";
import { OnboardNavigator } from "./OnboardNavigator";
import { GET_PROMPTS } from "../services/graphql/profile/queries";
import { setAllPrompts } from "../store/features/prompts/promptsSlice";

const AppTabStack = createBottomTabNavigator();

const AppNavigator = () => {
  const { user } = useAppSelector((state) => state.appUser);
  const userId = user?.userId;
  const voteOnboard = user?.voteOnboard;
  const isOnboarded = user?.onBoarding;

  const dispatch = useAppDispatch();

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
            userVisuals: JSON.parse(res.data),
          })
        );
      })
      .catch((err) => {});
  };

  const { data: promptsResult } = useQuery(GET_PROMPTS);

  useEffect(() => {
    getVisuals();
  }, [userId]);

  useEffect(() => {
    if (promptsResult) {
      dispatch(
        setAllPrompts({
          allPrompts: promptsResult.getPrompts,
        })
      );
    }
  }, [promptsResult]);

  return isOnboarded ? (
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
        name={screenName.PROFILE}
        component={ProfileNavigator}
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
        name={screenName.CONVERSATIONS}
        component={Conversations}
        options={{
          title: "Conversations",
          headerShown: true,
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
