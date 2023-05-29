import { StyleSheet } from "react-native";
import { Spacing, Colors } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "white",
    width: "50%",
    borderRadius: Spacing.SCALE_8,
    borderWidth: 5,
    borderColor: Colors.INPUT_BORDER,
    shadowOffset: {
      width: 9,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 14,
  },
});
