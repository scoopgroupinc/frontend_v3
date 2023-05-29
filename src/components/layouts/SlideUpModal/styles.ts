import { StyleSheet } from "react-native";
import { Spacing, Colors } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SLIDE_UP_MODAL_BG,
    borderTopRightRadius: 100,
    zIndex: 10,
    paddingRight: Spacing.SCALE_16,
    paddingLeft: Spacing.SCALE_16,
  },
  align: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
  },
  close: {
    position: "absolute",
    top: 5,
    right: 10,
  },
});
