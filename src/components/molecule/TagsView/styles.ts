import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: Spacing.SCALE_30,
  },
  switch: {
    marginBottom: Spacing.SCALE_40,
    padding: 10,
  },
  scroll: {
    width: "100%",
    height: "70%",
  },
  tagContainer: {
    flex: 1,
    width: "100%",
    paddingLeft: Spacing.SCALE_30,
    paddingRight: Spacing.SCALE_30,
    paddingTop: Spacing.SCALE_50,
    backgroundColor: Colors.WHITE,
    borderTopRightRadius: 110,
  },
});
