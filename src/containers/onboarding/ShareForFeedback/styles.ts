import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  btn: {
    marginVertical: Spacing.SCALE_8,
  },
  headingBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    marginTop: Spacing.SCALE_8,
    marginBottom: Spacing.SCALE_12,
    letterSpacing: Spacing.SCALE_2,
  },
  textBody: {
    width: "50%",
  },
  buttonsBody: {
    flex: 1,
    paddingVertical: Spacing.SCALE_16,
  },
  descriptionContainer: {
    marginTop: Spacing.SCALE_30,
    marginBottom: Spacing.SCALE_30,
  },
  section: { marginBottom: 20, paddingHorizontal: 20 },
  name: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_28,
    color: Colors.DARK_GRAY_BLUE,
  },
  city: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_20,
    color: Colors.DARK_GRAY_BLUE,
    marginBottom: Spacing.SCALE_10,
  },
  descriptionHeader: {
    marginBottom: Spacing.SCALE_10,
    fontSize: Typography.FONT_SIZE_18,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
});
