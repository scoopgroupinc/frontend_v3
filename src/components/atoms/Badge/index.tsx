import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../utils";

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

const Badge = ({ value }: { value: string }) => (
  <View style={styles.body}>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default Badge;
