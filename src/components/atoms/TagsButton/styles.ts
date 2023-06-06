import { StyleSheet } from "react-native";
import { Colors } from "../../../utils";

export const styles = StyleSheet.create({
  circleGradient: {
    margin: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    borderRadius: 25,
    marginBottom: 28,
  },
  text: {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    color: Colors.BLACK,
    fontSize: 18,
  },
});
