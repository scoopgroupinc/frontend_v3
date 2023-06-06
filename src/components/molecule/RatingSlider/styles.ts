import { StyleSheet } from "react-native";
import { Colors } from "../../../utils";

export const styles = StyleSheet.create({
  trackStyle: {
    backgroundColor: Colors.SLIDER_TRACK,
    height: 7,
    borderRadius: 50,
    marginTop: 5,
  },
  thumbStyle: {
    backgroundColor: "transparent",
    height: 35,
  },
});
