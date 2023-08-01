import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Typography } from "../../../utils";
import { styles } from "./styles";

const ButtonPill = (props: any) => (
  <View>
    <TouchableOpacity
      onPress={props?.onPress}
      disabled={props?.isButtonDisabled}
      style={[styles.body, props?.selected && styles.selectedButton]}
    >
      <Text
        style={{
          color: "#000",
          fontSize: 12,
          fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
        }}
      >
        {props?.title}
      </Text>
    </TouchableOpacity>
  </View>
);

export default ButtonPill;
