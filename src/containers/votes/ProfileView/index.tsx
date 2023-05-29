import React from "react";
import { Text, View } from "react-native";
import { AppButton } from "../../../components/atoms/AppButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../../utils/constants";

export const ProfileView = () => {
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
      <Text style={{ color: "white", fontSize: 20 }}>ProfileView</Text>
      <AppButton
        title="Go to PromptVote"
        onPress={() => {
          navigation.navigate(screenName.MATCH_VIEW);
        }}
      />
    </View>
  );
};
