import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Colors } from "../../../utils";
import { styles } from "./styles";
import { ButtonType } from "./types";

export const AppButton = ({
  title,
  onPress,
  color = Colors.DARK_GRAY_BLUE,
  disabled = false,
}: ButtonType) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.button}
    >
      <Text style={[{ color: color }, styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
};
