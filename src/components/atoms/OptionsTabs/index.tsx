import { Text, Pressable } from "react-native";
import React from "react";
import { styles } from "./styles";

interface OptionProps {
  optionName: string;
  icon: JSX.Element;
  btnAction?: () => void;
}

export const OptionTab = ({ optionName, icon, btnAction }: OptionProps) => {
  return (
    <Pressable onPress={btnAction} style={styles.optionContainer}>
      <Text style={styles.optionText}>{optionName}</Text>
      {icon}
    </Pressable>
  );
};

export default OptionTab;
