import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../../utils";
import { Spacing, Typography } from "../../../utils";

const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  modal: {
    paddingTop: 44,
    justifyContent: "flex-end",
  },
  container: {
    marginTop: windowHeight / 3,
    borderTopRightRadius: 100,
    backgroundColor: Colors.SLIDE_UP_MODAL_BG,
  },
  listView: {
    marginTop: Spacing.SCALE_20,
    padding: 10,
    marginBottom: Spacing.SCALE_40,
  },
  descriptionContainer: {
    marginTop: Spacing.SCALE_10,
    marginBottom: Spacing.SCALE_30,
  },
  descriptionHeader: {
    marginBottom: Spacing.SCALE_10,
    fontSize: Typography.FONT_SIZE_18,
    fontWeight: Typography.FONT_WEIGHT_BOLD,
  },
  descriptionText: {
    padding: Spacing.SCALE_4,
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY_BLUE,
  },
  name: {
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: Typography.FONT_SIZE_28,
    color: Colors.DARK_GRAY_BLUE,
  },
  age: {
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY_BLUE,
    marginBottom: Spacing.SCALE_10,
  },

  bottomSheet: {
    alignItems: "center",
    padding: Spacing.SCALE_12,
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  section: { marginBottom: 20, paddingHorizontal: 20 },
  content: {
    // padding: 5,
  },
});
