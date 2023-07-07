import { StyleSheet } from "react-native";
import { Colors } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
    height: 42,
    display: "flex",
    flexWrap: "wrap",
    width: "auto",
    shadowColor: "#000",
    elevation: 5, // for Android
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  button: {
    margin: 4,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    borderRadius: 100,
  },
});
