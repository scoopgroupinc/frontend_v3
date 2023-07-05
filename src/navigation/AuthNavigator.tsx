import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../utils/constants/screenName";
import Launch from "../containers/auth/Launch";
import LoginScreen from "../containers/auth/Login";
import CreateAccount from "../containers/auth/CreateAccount";
import ForgotPassword from "../containers/auth/ForgotPassword";
import ResetPassword from "../containers/auth/ResetPassword";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name={screenName.LAUNCH} component={Launch} />
    <AuthStack.Screen name={screenName.LOGIN} component={LoginScreen} />
    <AuthStack.Screen name={screenName.REGISTER} component={CreateAccount} />
    <AuthStack.Screen name={screenName.FORGOT_PASSWORD} component={ForgotPassword} />
    <AuthStack.Screen name={screenName.RESET_PASSWORD} component={ResetPassword} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
