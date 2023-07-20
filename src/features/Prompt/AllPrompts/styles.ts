import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: Spacing.SCALE_30,
    marginHorizontal: Spacing.SCALE_30,
  },
  modalHeader: {
    alignSelf: "flex-start",
    marginBottom: Spacing.SCALE_20,
  },
  modalHeaderText: {
    color: Colors.DARK_GRAY_BLUE,
    fontFamily: Typography.FONT_POPPINS_BOLD,
    fontSize: Typography.FONT_SIZE_24,
    paddingRight: Spacing.SCALE_16,
    letterSpacing: 2,
    marginTop: Spacing.SCALE_20,
    marginBottom: Spacing.SCALE_10,
  },
  modalContainer: {
    flex: 5,
    backgroundColor: Colors.WHITE,
    borderTopRightRadius: 110,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    borderRadius: 5,
    width: "60%",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50,
    marginTop: Spacing.SCALE_20,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#2196F3",
  },
  modalButtonText: { color: "white", fontWeight: "bold", textAlign: "center" },
  modalInput: {
    borderRadius: 5,
    paddingLeft: 15,
    fontFamily: "Poppins_400Regular",
    width: 290,
  },
  text: {
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
  optionText: {
    fontSize: 16,
  },
  textContainer: {
    width: "80%",
  },
});
