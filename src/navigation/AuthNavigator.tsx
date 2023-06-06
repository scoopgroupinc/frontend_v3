import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import screenName from "../utils/constants/screenName";
import Launch from "../containers/auth/Launch";
import LoginScreen from "../containers/auth/Login";
import CreateAccount from "../containers/auth/CreateAccount";

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={screenName.LAUNCH} component={Launch} />
      <AuthStack.Screen name={screenName.LOGIN} component={LoginScreen} />
      <AuthStack.Screen name={screenName.REGISTER} component={CreateAccount} />
      {/* <AuthNavigator
        name={screenName.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
      <AuthNavigator
        name={screenName.RESET_PASSWORD}
        component={ResetPasswordScreen}
      /> */}
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;
