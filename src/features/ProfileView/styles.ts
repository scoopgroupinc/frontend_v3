import { Dimensions, StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../utils";

const windowHeight = Dimensions.get("window").height;
const screenHeight = Dimensions.get("window").height;
const onethirdScreenHeight = screenHeight / 3;

export const styles = StyleSheet.create({
  modal: {
    paddingTop: 44,
    justifyContent: "flex-end",
  },
  container: {
    // flex: 1,
    marginTop: windowHeight / 3,
    borderTopRightRadius: 100,
    backgroundColor: Colors.SLIDE_UP_MODAL_BG,
  },
  listView: {
    marginTop: Spacing.SCALE_20,
    padding: 10,
    marginBottom: Spacing.SCALE_40,
  },
  whiteArc: {
    width: "100%",
    height: "100%",
    marginTop: onethirdScreenHeight,
    marginBottom: "10%",
    backgroundColor: "white",
    borderTopRightRadius: 110,
    padding: 20,
  },
  descriptionContainer: {
    marginTop: Spacing.SCALE_18,
    marginBottom: Spacing.SCALE_18,
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
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_28,
    color: Colors.DARK_GRAY_BLUE,
  },
  age: {
    fontFamily: Typography.FONT_POPPINS_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.DARK_GRAY_BLUE,
    marginBottom: Spacing.SCALE_10,
  },
  badgeContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    color: Colors.DARK_GRAY_BLUE,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 50,
    paddingHorizontal: Spacing.SCALE_10,
    paddingVertical: Spacing.SCALE_4,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: Spacing.SCALE_4,
  },
  city: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_20,
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
  buttonBody: { 
    backgroundColor: Colors.WHITE, padding: Spacing.SCALE_20 },
});
