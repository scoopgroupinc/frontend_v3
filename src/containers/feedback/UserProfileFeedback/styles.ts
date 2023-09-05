import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  copyLinkBody: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.TEAL,
    backgroundColor: Colors.TEAL,
    padding: 10,
  },
  copyLinkText: {
    color: Colors.WHITE,
    fontSize: 15,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
  activateDeactivateBody: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    backgroundColor: Colors.WHITE,
    padding: 10,
  },
  activateDeactivateText: {
    color: Colors.BLACK,
    fontSize: 15,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    marginHorizontal: 10,
  },
  traitsText: {
    color: Colors.WHITE,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    marginVertical: 5,
  },
  tagsBody: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
});
