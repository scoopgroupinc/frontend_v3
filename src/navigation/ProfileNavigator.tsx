import React, { useEffect, useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { UserProfileEdit } from "../containers/home/UserProfileEdit";
import { screenName } from "../utils/constants";
import { UserProfileView } from "../containers/home/UserProfileView";
import UserProfile from "../containers/home/UserProfile";
import AppNavigator from "./AppNavigator";
import Messages from "../containers/chat/Messages";
import { storeStringData } from "../utils/storage";

const HomeStack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const ProfileNavigator = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      await storeStringData("expoPushToken", token);
      setExpoPushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((nots) => {
      setNotification(nots);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (notification) {
      console.log("notification", notification);
    }
  }, [notification]);

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
