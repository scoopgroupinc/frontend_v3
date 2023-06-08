import { StyleSheet } from "react-native";
import { Typography, Colors, Spacing } from "../../../utils";

const styles = StyleSheet.create({
  label: {
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.WHITE,
  },
  sliderContainer: {
    paddingVertical: 16,
    display: "flex",
    flexFlow: " row wrap",
  },
  trackStyle: {
    backgroundColor: Colors.SLIDER_TRACK,
    height: 7,
    borderRadius: 50,
  },
  thumbStyle: {
    backgroundColor: "transparent",
    height: 35,
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    // width: '100%',
  },
  text: {
    fontFamily: Typography.FONT_POPPINS_BOLD,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_18,
    paddingBottom: Spacing.SCALE_2,
  },
  smallText: {
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    paddingBottom: Spacing.SCALE_2,
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
});

export default styles;
