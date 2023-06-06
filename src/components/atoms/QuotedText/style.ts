import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  textContainer: {
    marginTop: Spacing.SCALE_24,
    borderWidth: 1,
    borderColor: Colors.BLACK,
    padding: Spacing.SCALE_20,
    borderRadius: Spacing.SCALE_16,
  },
  title: {
    color: Colors.BLACK,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    paddingLeft: Spacing.SCALE_20,
    paddingRight: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_8,
  },
  text: {
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    paddingLeft: Spacing.SCALE_20,
    paddingRight: Spacing.SCALE_20,
  },
  // svg: {
  //   position: 'absolute',
  // },
});
