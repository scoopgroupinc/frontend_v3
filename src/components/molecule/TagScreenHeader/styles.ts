import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../../utils";

export const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: Spacing.SCALE_20,
    marginHorizontal: Spacing.SCALE_30,
  },
  text: {
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "bold",
  },
  textContainer: {
    width: "80%",
  },
});
