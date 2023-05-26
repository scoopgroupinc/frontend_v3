import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";

const HomeStack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={() => (
          <View
            style={{
              flex: 1,
              backgroundColor: "goldenrod",
            }}
          >
            <Text>Home</Text>
          </View>
        )}
      />
    </HomeStack.Navigator>
  );
};

export default ProfileNavigator;
