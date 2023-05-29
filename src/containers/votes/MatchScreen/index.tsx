import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import { AppButton } from "../../../components/atoms/AppButton";
import { screenName } from "../../../utils/constants";

export const MatchScreen = () => {
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
        This is the MatchScreen screen
      </Text>
      <AppButton
        title="Go to ComeBackTomorrow"
        onPress={() => navigation.navigate(screenName.COME_BACK_LATER)}
      />
    </View>
  );
};
