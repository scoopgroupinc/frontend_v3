import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import screenName from "../utils/constants/screenName";
import Launch from "../containers/Auth/Launch";
import LoginScreen from "../containers/Auth/Login";
import CreateAccount from "../containers/Auth/CreateAccount";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
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
};

export default AuthNavigator;
