import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../../utils";

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: Colors.RUST,
    height: "100%",
    opacity: 1,
    width: "100%",
    zIndex: 1,
  },
});

const AppActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView autoPlay loop source={require("../../../assets/animations/loader.json")} />
    </View>
  );
};

export default AppActivityIndicator;
