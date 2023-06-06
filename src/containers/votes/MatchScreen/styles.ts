import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeIcon: {
    right: 20,
    position: "absolute",
    top: 0,
  },
  text: {
    alignSelf: "center",
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_24,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 100,
    borderColor: Colors.WHITE,
    borderWidth: 5,
  },
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 50,
  },
  match: {
    height: 70,
    width: 70,
    position: "absolute",
    left: 90,
    top: 80,
  },
  label: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.WHITE,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
  },
  input: {
    borderWidth: 4,
    width: "100%",
    borderRadius: Spacing.SCALE_8,
    padding: Spacing.SCALE_12,
    borderColor: Colors.INPUT_BORDER,
    backgroundColor: Colors.INPUT_BG,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    marginTop: Spacing.SCALE_8,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 9,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 14,

    elevation: -8,
  },

  btn: {
    marginTop: 20,
  },
});
