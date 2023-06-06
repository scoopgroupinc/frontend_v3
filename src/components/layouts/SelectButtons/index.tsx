import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../../utils";
import { styles } from "./styles";

export const SelectButtons = ({ funk, titles }: any) => {
  const [value, setValue] = useState<string>("");

  const onSelectGender = (item: string) => {
    setValue(item);
    funk(item);
  };

  return (
    <View style={styles.container}>
      {titles.map((item: string, index: number) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.btnContainer,
            {
              backgroundColor:
                value === item ? Colors.WHITE : Colors.TRANSPARENT,
            },
          ]}
          onPress={() => onSelectGender(item)}
        >
          <Text
            style={[
              styles.btnText,
              {
                color: value === item ? Colors.BLACK : Colors.WHITE,
              },
            ]}
          >
            {item === "bisexual"
              ? "Both"
              : item.charAt(0).toUpperCase() + item.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
