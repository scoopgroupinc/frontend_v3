import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  signInBtn: {
    marginTop: Spacing.SCALE_24,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: Typography.FONT_SIZE_16,
  },
  header: {
    color: "white",
  },
  btnContainer: {
    padding: Spacing.SCALE_18,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  link: {
    color: Colors.WHITE,
    textDecorationLine: "none",
    fontSize: Typography.FONT_SIZE_16,
    paddingTop: Spacing.SCALE_12,
    paddingBottom: Spacing.SCALE_12,
  },
  errorText: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.WHITE_30,
  },
  lastError: {
    fontSize: Typography.FONT_SIZE_12,
    color: Colors.WHITE_30,
    marginBottom: "-10%",
  },
  title: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_30,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    marginTop: Spacing.SCALE_8,
    marginBottom: Spacing.SCALE_18,
    letterSpacing: Spacing.SCALE_2,
  },
});

export default styles;
