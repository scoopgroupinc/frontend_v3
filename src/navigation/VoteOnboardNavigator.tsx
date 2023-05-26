import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";

const VoteOnboardStack = createStackNavigator();

const VoteOnboardNavigator = () => {
  return (
    <VoteOnboardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <VoteOnboardStack.Screen
        name="VoteScreens"
        component={() => (
          <View
            style={{
              flex: 1,
              backgroundColor: "gold",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>VoteScreens</Text>
          </View>
        )}
      />
    </VoteOnboardStack.Navigator>
  );
};

export default VoteOnboardNavigator;
