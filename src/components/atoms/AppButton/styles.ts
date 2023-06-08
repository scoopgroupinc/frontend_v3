import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  button: {
    borderRadius: Spacing.SCALE_24,
    borderWidth: 1,
    borderColor: Colors.ICE_WHITE,
    backgroundColor: Colors.ICE_WHITE,
    marginTop: Spacing.SCALE_16,
    marginBottom: Spacing.SCALE_16,
    width: "100%",
    height: 40,
    color: Colors.WHITE,
   // fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
  //  fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
  },
});
