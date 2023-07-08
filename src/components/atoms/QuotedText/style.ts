import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  textContainer: {
    width: "100%",
    marginTop: Spacing.SCALE_24,
    padding: Spacing.SCALE_20,
    borderRadius: Spacing.SCALE_16,
    backgroundColor: "rgba(250, 250, 250, 0.7)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  quote: {
    position: "absolute",
    right: -70,
    top: -100,
    fontSize: 350,
    fontFamily: Typography.FONT_FAMILY.Coustard_400Regular,
    color: Colors.RED,
    opacity: 0.3,
  },
  title: {
    color: Colors.BLACK,
    fontFamily: Typography.FONT_FAMILY.Capriola_400Regular,
    fontSize: Typography.FONT_SIZE_16,
    paddingLeft: Spacing.SCALE_20,
    paddingRight: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_8,
  },
  text: {
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_FAMILY.Poppins_400Regular,
    paddingLeft: Spacing.SCALE_20,
    paddingRight: Spacing.SCALE_20,
  },
  // svg: {
  //   position: 'absolute',
  // },
});
