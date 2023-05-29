import { StyleSheet } from "react-native";
import { Typography, Spacing, Colors } from "../../../utils";

export const styles = StyleSheet.create({
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
});
