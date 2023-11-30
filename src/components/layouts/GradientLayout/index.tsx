import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

import { SafeAreaView } from "react-native";
import { Colors } from "../../../utils";

interface LayoutType {
  children: ReactNode;
  marginTop: string | undefined;
  marginBottom: string | undefined;
}
export const GradientLayout = ({ children, marginTop, marginBottom }: LayoutType) => {
  const gradient = Colors.GRADIENT_BG;
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1.2 }}
    >
      <SafeAreaView
        style={{
          marginLeft: "3%",
          marginRight: "3%",
          marginBottom: marginBottom || "3%",
          marginTop: marginTop || "10%",
          flex: 1,
        }}
      >
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};
