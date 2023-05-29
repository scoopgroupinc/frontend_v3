import React, { ReactNode } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { styles } from "./styles";

interface LayoutType {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

export const AppIconButton = ({ children, onPress, style }: LayoutType) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.icon, style]}>
      {children}
    </TouchableOpacity>
  );
};
