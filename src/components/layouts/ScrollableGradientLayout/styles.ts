import { StyleSheet , StatusBar } from "react-native";
import { Spacing } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: Spacing.SCALE_12,
    // height: "100%",
  },
  alignCenter: {
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
  },
});
