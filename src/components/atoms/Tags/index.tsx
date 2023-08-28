import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const Tags = (props: any) => {
  const { title, style } = props;
  return (
    <View style={[styles.body, style]}>
      <Text style={[styles.text, style]}>{title}</Text>
    </View>
  );
};

export default Tags;
