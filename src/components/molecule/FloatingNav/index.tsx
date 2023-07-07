import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "../../../utils";
import { styles } from "./styles";
import { FloatingNavItemList } from "./types";
import { FloatingNavButton } from "./FloatingNavButton";

export const FloatingNav = ({ items }: FloatingNavItemList) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];
  const [isPressedId, setIsPressedId] = useState("");

  return (
    <View style={styles.container}>
      {items.map(({ id, icon, onPress, isSelected }) => (
        <TouchableOpacity
          key={id}
          onPressIn={() => setIsPressedId(id)}
          onPressOut={() => setIsPressedId("")}
          onPress={onPress}
        >
          <FloatingNavButton icon={icon} focused={id === isPressedId || isSelected} />
        </TouchableOpacity>
      ))}
    </View>
  );
};
