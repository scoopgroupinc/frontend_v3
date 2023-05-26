import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profile: { marginTop: 5, backgroundColor: "white" },
  header: { marginLeft: 5, paddingTop: 2 },
  textButton: {
    color: Colors.BLACK,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: 16,
  },
});
