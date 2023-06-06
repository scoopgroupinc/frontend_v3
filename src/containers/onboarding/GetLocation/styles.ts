import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "src/styles";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "center",
    marginTop: Spacing.SCALE_24,
  },
  text: {
    color: Colors.WHITE,
    marginTop: 10,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    padding: Spacing.SCALE_12,
  },
  textMinor: {
    fontSize: Typography.FONT_SIZE_18,
  },
  textHeader: {
    fontSize: Typography.FONT_SIZE_30,
    textAlign: "center",
  },
  modalHeaderText: {
    color: Colors.DARK_GRAY_BLUE,
    fontFamily: Typography.FONT_POPPINS_BOLD,
    fontSize: Typography.FONT_SIZE_24,
    paddingRight: Spacing.SCALE_16,
    letterSpacing: 2,
  },
  modalContainer: {
    justifyContent: "space-between",
    height: "85%",
  },
});
