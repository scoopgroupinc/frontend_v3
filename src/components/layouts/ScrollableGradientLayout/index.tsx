import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../utils";
import { styles } from "./styles";

export const ScrollableGradientLayout = ({ children, align, safe = true }: any) => {
  const gradient = ["#197CAD", "#06B198", "#990012"];

  return (
    <LinearGradient style={[styles.container, align && styles.alignCenter]} colors={gradient}>
      {safe ? (
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      )}
    </LinearGradient>
  );
};
