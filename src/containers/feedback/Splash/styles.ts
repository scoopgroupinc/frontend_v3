import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  body: {
    flex: 2,
    alignItems: "center",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing.SCALE_8,
  },
  buttonsBody: {
    paddingVertical: Spacing.SCALE_16,
  },
  requestBody: {
    width: "50%",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    marginTop: Spacing.SCALE_8,
    marginBottom: Spacing.SCALE_12,
    letterSpacing: Spacing.SCALE_2,
    textAlign: "center",
  },
});
