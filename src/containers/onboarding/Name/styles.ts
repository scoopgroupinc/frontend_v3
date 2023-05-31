import { StyleSheet } from "react-native";
import { Colors, Typography, Spacing } from "../../../utils";

export const styles = StyleSheet.create({
  title: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_28,
    textAlign: "center",
    color: Colors.WHITE,
    marginBottom: Spacing.SCALE_30,
    marginTop: Spacing.SCALE_30,
  },
  subTitle: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
    marginBottom: Spacing.SCALE_30,
    alignSelf: "flex-start",
  },
  fieldContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  errorText: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.WHITE_30,
  },
});
