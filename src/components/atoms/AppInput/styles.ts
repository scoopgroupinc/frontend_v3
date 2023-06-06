import { StyleSheet } from "react-native";
import { Spacing, Typography, Colors } from "../../../utils";

export const styles = StyleSheet.create({
  input: {
    borderWidth: 4,
    width: "100%",
    borderRadius: Spacing.SCALE_8,
    padding: Spacing.SCALE_12,
    borderColor: Colors.INPUT_BORDER,
    backgroundColor: Colors.INPUT_BG,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Spacing.SCALE_8,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 9,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 14,

    elevation: -8,
  },
  label: {
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
  },
  eye: {
    position: "absolute",
    top: "50%",
    right: 10,
  },
});
