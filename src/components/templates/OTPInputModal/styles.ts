import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "80%",
    display: "flex",
    justifyContent: "space-between",
  },
  innerContainer: {
    marginTop: 40,
  },
  container: {
    width: "100%",
    marginBottom: "10%",
    position: "relative",
    alignItems: "center",
    marginTop: "20%",
    display: "flex",
    justifyContent: "center",
  },
  headerText: {
    color: Colors.DARK_GRAY_BLUE,
    fontFamily: Typography.FONT_POPPINS_BOLD,
    fontSize: Typography.FONT_SIZE_24,
    paddingRight: Spacing.SCALE_16,
    paddingLeft: Spacing.SCALE_16,
    letterSpacing: 2,
  },
  text: {
    textAlign: "center",
    color: Colors.GRAY_BLUE,
    marginTop: 50,
    marginBottom: 16,
  },
  buttonResend: {
    borderWidth: 1,
    borderColor: Colors.TEAL,
    backgroundColor: Colors.TEAL,
    width: "40%",
  },
  buttonVerify: {
    borderWidth: 1,
    borderColor: Colors.RUST,
    backgroundColor: Colors.TEAL,
  },
});
