import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import { Colors } from "../../../utils";
import { styles } from "./styles";

export interface ButtonType {
  title: string;
  txtColor?: string;
  disabled?: boolean;
  bgColor?: any;
  onPress?: () => void;
  style?: ViewStyle;
}

export function AppButton({
  title,
  onPress,
  txtColor = Colors.DARK_GRAY_BLUE,
  disabled = false,
  bgColor,
  style,
}: ButtonType) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        style,
        // {
        //   backgroundColor: disabled ? "transparent" : bgColor,
        // },
      ]}
    >
      <Text style={[{ color: txtColor }, styles.text]}>{title}</Text>
    </Pressable>
  );
}
