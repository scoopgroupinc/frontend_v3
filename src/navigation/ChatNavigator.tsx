import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenName } from "../utils/constants";
import Conversations from "../containers/Chat/Conversations";
import Messages from "../containers/Chat/Messages";

const ChatStack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChatStack.Screen
        name={screenName.CONVERSATIONS}
        component={Conversations}
      />
      <ChatStack.Screen name={screenName.MESSAGES} component={Messages} />
    </ChatStack.Navigator>
  );
};

export default ChatNavigator;
