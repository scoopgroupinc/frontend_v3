import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  btnContainer: {
    padding: Spacing.SCALE_18,
    flex: 1,
    alignItems: "center",
  },
  link: {
    color: Colors.WHITE,
    textDecorationLine: "none",
    fontSize: Typography.FONT_SIZE_16,
    paddingTop: Spacing.SCALE_12,
    paddingBottom: Spacing.SCALE_12,
  },
  title: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_30,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    marginTop: Spacing.SCALE_8,
    marginBottom: Spacing.SCALE_18,
    letterSpacing: Spacing.SCALE_2,
  },
});
