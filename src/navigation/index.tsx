import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as Linking from "expo-linking";
import { useAppSelector } from "../store/hooks";
import AuthNavigator from "./AuthNavigator";
import screenName from "../utils/constants/screenName";
import ProfileNavigator from "./ProfileNavigator/ProfileNavigator";
import { navigationRef } from "./RootNavigation";

const Stack = createNativeStackNavigator();
const prefix = Linking.createURL("/");

const Navigator = () => {
 
  const linking = {
    prefixes: [prefix],
  };

  const { user } = useAppSelector((state) => state.appUser);

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
