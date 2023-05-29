import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppButton } from "../../../components/atoms/AppButton";
import { screenName } from "../../../utils/constants";

export const VisualVote = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "tomato",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 20 }}>
        This is the VisualVote screen
      </Text>
      <AppButton
        title="Go to MatchScreen"
        onPress={() => navigation.navigate(screenName.PROFILE_VIEW)}
      />
    </View>
  );
};
