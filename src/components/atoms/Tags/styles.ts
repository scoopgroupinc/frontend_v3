import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  body: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.WHITE,
    padding: 8,
    marginHorizontal: 1,
  },
  text: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: 12,
  },
});
