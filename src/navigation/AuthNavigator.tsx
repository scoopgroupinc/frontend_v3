import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screenName from "../utils/constants/screenName";
import Launch from "../containers/auth/Launch";
import AppleEmail from "../features/SocialLogin/AppleLogin/AppleEmail";
import UnAuthorizedFeedbackUser from "../containers/feedback/UnAuthorizedFeedbackUser";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name={screenName.LAUNCH} component={Launch} />
    <AuthStack.Screen name={screenName.APPLE_EMAIL} component={AppleEmail} />
    <AuthStack.Screen
      name={screenName.UNAUTHORIZEDFEEDBACKUSER}
      component={UnAuthorizedFeedbackUser}
    />
  </AuthStack.Navigator>
);
export default AuthNavigator;
