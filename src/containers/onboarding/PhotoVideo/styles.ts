import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_24,
    margin: Spacing.SCALE_16,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
  photoContainer: {
    flex: 1,
    marginTop: Spacing.SCALE_24,
  },
});
