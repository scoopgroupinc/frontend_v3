import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppButton } from "../../../components/atoms/AppButton";

export const ComeBackTomorrow = () => {
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
      <Text style={{ color: "white", fontSize: 20 }}>ComeBackTomorrow</Text>
      <AppButton title="Go to the Top" onPress={() => navigation.popToTop()} />
    </View>
  );
};
