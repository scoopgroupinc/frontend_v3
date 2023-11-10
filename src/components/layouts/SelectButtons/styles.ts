import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: "100%",
  },
  btnContainer: {
    borderWidth: 1,
    borderColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 50,
    marginBottom: 20,
  },
  btnText: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    padding: 20,
    borderStyle: "solid",
    borderTopColor: Colors.WHITE,
    borderBottomColor: Colors.WHITE,
    borderLeftColor: Colors.WHITE,
    borderRightColor: Colors.WHITE,
  },
});
