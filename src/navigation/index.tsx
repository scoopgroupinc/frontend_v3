import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "../store/hooks";
import AuthNavigator from "./AuthNavigator";
import screenName from "../utils/constants/screenName";
import ProfileNavigator from "./ProfileNavigator";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  // because of persistGate, we can fetch the user from the store
  const { user } = useAppSelector((state) => state.appUser);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
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
