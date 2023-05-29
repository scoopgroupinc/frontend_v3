import React from "react";
import { View, Text } from "react-native";
import { AppButton } from "../../../components/atoms/AppButton";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../../utils/constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const PromptVote = () => {
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
      <Text style={{ color: "white", fontSize: 20 }}>PromptVote</Text>
      <AppButton
        title="Go to VisualVote"
        onPress={() => navigation.navigate(screenName.VISUAL_VOTE)}
      />
    </View>
  );
};
