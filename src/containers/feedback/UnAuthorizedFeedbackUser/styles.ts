import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  body: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    marginTop: Spacing.SCALE_8,
    marginBottom: Spacing.SCALE_12,
    letterSpacing: Spacing.SCALE_2,
    textAlign: "center",
  },
  btn: {
    marginVertical: Spacing.SCALE_8,
  },
  buttonsBody: {
    flex: 1,
    paddingVertical: Spacing.SCALE_16,
  },
});
