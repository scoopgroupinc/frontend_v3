import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
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
    shadowColor: Colors.BLACK,
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
  labelContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  eye: {
    position: "absolute",
    paddingTop: 10,
    right: 10,
  },
  errorText: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.ICE_WHITE,
    marginTop: Spacing.SCALE_8,
  },
});
