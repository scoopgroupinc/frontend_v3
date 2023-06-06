import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { SafeAreaView, View } from "react-native";
import { Colors } from "../../../utils";

interface LayoutType {
  children: ReactNode;
  safearea?: boolean;
}
export const GradientLayout = ({ children, safearea = true }: LayoutType) => {
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
