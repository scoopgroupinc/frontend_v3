import { StyleSheet } from "react-native";
import { Spacing, Typography, Colors } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  textContainer: {
    marginTop: Spacing.SCALE_30,
  },

  dateContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  dobSubTitle: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
    marginBottom: Spacing.SCALE_16,
    alignSelf: "flex-start",
  },
  date: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_30,
    color: Colors.WHITE,
    marginTop: Spacing.SCALE_24,
    marginBottom: Spacing.SCALE_16,
    alignSelf: "center",
  },
});
