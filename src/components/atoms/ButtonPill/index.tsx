import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const ButtonPill = (props: any) => (
  <TouchableOpacity
    onPress={props?.onPress}
    disabled={props?.isButtonDisabled}
    style={[styles.body, props?.selected && styles.selectedButton]}
  >
    <Text
      style={{
        color: props?.selected ? "#000" : "#fff",
        fontSize: 12,
        fontWeight: "700",
      }}
    >
      {props?.title}
    </Text>
  </TouchableOpacity>
);

export default ButtonPill;
