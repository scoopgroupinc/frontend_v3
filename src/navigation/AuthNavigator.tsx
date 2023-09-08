import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../utils/constants/screenName";
import Launch from "../containers/auth/Launch";

import AppleEmail from "../containers/auth/AppleEmail";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name={screenName.LAUNCH} component={Launch} />
    <AuthStack.Screen name={screenName.APPLE_EMAIL} component={AppleEmail} />
  </AuthStack.Navigator>
);
export default AuthNavigator;
