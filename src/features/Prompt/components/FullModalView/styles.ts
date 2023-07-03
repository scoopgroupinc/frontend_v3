import { StyleSheet } from "react-native";
import { Spacing, Colors, Typography } from "../../../../utils";

export const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.RUST,
    paddingTop: 44,
  },
  textContainer: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    color: Colors.WHITE,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
  textSmall: {
    flex: 1,
    fontSize: Typography.FONT_SIZE_20,
  },
  textBig: {
    flex: 2,
    textAlign: "center",
    fontSize: Typography.FONT_SIZE_24,
  },
  children: {},
  listView: {
    marginTop: Spacing.SCALE_40,
  },
});
