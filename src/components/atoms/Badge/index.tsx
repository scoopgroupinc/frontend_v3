import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../utils";

function Badge({ value }: { value: string }) {
  return (
    <View style={styles.body}>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: 80,
    padding: 4,
    backgroundColor: Colors.RUST,
    borderRadius: 10,
  },
  value: {
    textAlign: "center",
    color: Colors.WHITE,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
});

export default Badge;
