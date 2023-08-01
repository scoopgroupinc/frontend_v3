import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

const Tags = (props: any) => {
  const { title, style } = props;
  return (
    <TouchableOpacity style={[styles.body, style]}>
      <Text style={[styles.text, style]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Tags;
