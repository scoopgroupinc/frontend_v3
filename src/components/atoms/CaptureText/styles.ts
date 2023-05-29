import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.ADD_PHOTO_BG,
    borderRadius: Spacing.SCALE_12,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.SCALE_30,
    margin: Spacing.SCALE_8,
    width: "95%",
    position: "relative",
    overflow: "hidden",
  },
  textContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: Spacing.SCALE_12,
    justifyContent: "center",
    padding: Spacing.SCALE_20,
    margin: Spacing.SCALE_8,
  },
  close: {
    position: "absolute",
    zIndex: 10,
    right: -10,
    top: -8,
    borderRadius: 15,
  },
});
