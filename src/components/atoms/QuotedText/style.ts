import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  textContainer: {
    width: "100%",
    marginTop: Spacing.SCALE_24,
    padding: Spacing.SCALE_20,
    borderRadius: Spacing.SCALE_16,
    backgroundColor: "rgba(220, 230, 230, 0.5)",

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
    color: Colors.SLATE,
    fontSize: Typography.FONT_SIZE_18,
    paddingRight: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_8,
  },
  text: {
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_20,
    paddingRight: Spacing.SCALE_20,
  },
});
