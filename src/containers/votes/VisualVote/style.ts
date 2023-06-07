import { StyleSheet } from "react-native";
import { Typography, Spacing, Colors } from "../../../utils";

export const styles = StyleSheet.create({
  label: {
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    paddingVertical: 16,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-between',
  },
  text: {
    fontFamily: Typography.FONT_POPPINS_BOLD,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_18,
    paddingBottom: Spacing.SCALE_2,
  },
  smallText: {
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    paddingBottom: Spacing.SCALE_2,
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
    shadowColor: "black",
    shadowOffset: {
      width: 9,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 14,

    elevation: -8,
  },
});
