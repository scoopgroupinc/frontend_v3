import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../utils";
import { styles } from "./styles";

export const ScrollableGradientLayout = ({ children, align, safe = true }: any) => {
  const gradient = Colors.GRADIENT_BG;

  return (
    <LinearGradient
      style={[styles.container, align && styles.alignCenter]}
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1.2 }}
    >
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
