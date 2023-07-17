import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../../../utils";

export const styles = StyleSheet.create({
  mediaHeader: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontWeight: "400",
    marginBottom: 20,
  },
  mediaBox: {
    borderWidth: 2,
    borderColor: Colors.WHITE,
    borderStyle: "dashed",
    padding: "3%",
    borderRadius: 15,
  },
});
