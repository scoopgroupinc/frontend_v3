import { StyleSheet } from "react-native";
import { Colors } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
    width: 100,
    height: 100,
    elevation: 1,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 7,
    borderRadius: 100,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 75,
    height: 75,
    zIndex: 1,
    elevation: 1,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    borderRadius: 100,
  },
});
