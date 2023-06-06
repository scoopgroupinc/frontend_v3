import { StyleSheet } from "react-native";
import { Spacing, Colors, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  progressBar: {
    width: "100%",
    height: 3,
  },

  mediaBox: {
    borderWidth: 2,
    borderColor: Colors.WHITE,
    borderStyle: "dashed",
    padding: "3%",
    borderRadius: 15,
  },
  mediaContainer: {
    padding: 10,
    marginTop: "3%",
  },
  mediaHeader: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontWeight: "400",
    marginBottom: 20,
  },
});
