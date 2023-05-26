import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 3,
  },
  btnContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    marginTop: Spacing.SCALE_8,
    marginBottom: Spacing.SCALE_12,
    letterSpacing: Spacing.SCALE_2,
  },
  blur: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    letterSpacing: Spacing.SCALE_2,
  },
  link: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    color: Colors.WHITE,
    textDecorationLine: "none",
    fontSize: Typography.FONT_SIZE_16,
    paddingTop: Spacing.SCALE_12,
    paddingBottom: Spacing.SCALE_12,
  },
});
