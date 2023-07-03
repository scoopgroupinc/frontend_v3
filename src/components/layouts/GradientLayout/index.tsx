import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { SafeAreaView } from "react-native";
import { Colors } from "../../../utils";

interface LayoutType {
  children: ReactNode;
}
export const GradientLayout = ({ children }: LayoutType) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];
  return (
    <LinearGradient style={{ flex: 1 }} colors={gradient}>
      <SafeAreaView
        style={{
          marginLeft: "3%",
          marginRight: "3%",
          marginBottom: "3%",
          marginTop: "10%",
          flex: 1,
        }}
      >
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};
