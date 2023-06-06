import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  btnContainer: {
    flex: 1,
    paddingVertical: 16,
    marginTop: Spacing.SCALE_30,
    justifyContent: "space-between",
  },

  genderText: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.WHITE,
    padding: 20,
    border: "2px solid #fff",
  },
  genderTitle: {
    flex: 1,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_28,
    color: Colors.WHITE,
    padding: 20,
  },
  progresBar: {
    flex: 1,
    width: "100%",
    marginTop: Spacing.SCALE_30,
  },
});
