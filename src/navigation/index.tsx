import React, { useEffect, useCallback } from "react";
import { Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as Linking from "expo-linking";
import { useAppSelector } from "../store/hooks";
import AuthNavigator from "./AuthNavigator";
import screenName from "../utils/constants/screenName";
import ProfileNavigator from "./ProfileNavigator/ProfileNavigator";
import { useNotifications } from "../hooks/useNotification";
import notificationAxios from "../services/axios/notificationAxios";
import { navigationRef } from "./RootNavigation";

const Stack = createNativeStackNavigator();
const prefix = Linking.createURL("/");

const Navigator = () => {
  const { user } = useAppSelector((state) => state.appUser);
  const { registerForPushNotificationsAsync } = useNotifications();

  const linking = {
    prefixes: [prefix],
  };

  const saveNotificationToken = useCallback(
    async (usr: any) => {
      const notificationToken = await registerForPushNotificationsAsync();
      if (notificationToken) {
        await notificationAxios.put("deviceToken", {
          notificationToken,
          osType: Platform.OS,
          version: Platform.Version,
          userId: usr.userId,
        });
      }
    },
    [registerForPushNotificationsAsync]
  );

  useEffect(() => {
    if (user) {
      saveNotificationToken(user);
    }
  }, [user, saveNotificationToken]);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef} linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user ? (
            <Stack.Screen name={screenName.PROFILE_NAVIGATOR} component={ProfileNavigator} />
          ) : (
            <Stack.Screen name={screenName.AUTH_NAVIGATOR} component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigator;
