import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  genderContainer: {
    flex: 1,
    paddingVertical: 16,
    marginTop: Spacing.SCALE_30,
    justifyContent: "space-between",
  },

  genderTypesContainer: {
    flex: 2,
    width: "100%",
  },
  genderText: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    color: Colors.WHITE,
    padding: 20,
    border: "2px solid #fff",
  },
  progresBar: {
    flex: 1,
    width: "100%",
    marginTop: Spacing.SCALE_30,
  },
});
