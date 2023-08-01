import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.BLACK,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
  tagsBody: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  author: {
    alignSelf: "flex-end",
    fontSize: 10,
    color: Colors.BLACK,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
  dateTime: {
    fontSize: 10,
    color: Colors.BLACK,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
});
