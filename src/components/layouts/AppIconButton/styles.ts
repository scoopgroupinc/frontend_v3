import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../../utils";

export const styles = StyleSheet.create({
  icon: {
    backgroundColor: Colors.NEO_BUTTON_BG,
    padding: Spacing.SCALE_4,
    alignSelf: "flex-end",
    borderColor: Colors.NEO_BUTTON_BORDER,
    borderWidth: 4,
    borderRadius: 12,
  },
});
