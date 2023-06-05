import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.SLIDE_UP_MODAL_BG,
    position: "relative",
    width: "85%",
    padding: Spacing.SCALE_18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 90,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "hsla(240, 16%, 12%, 0.5)",
  },
});
