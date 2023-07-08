import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../../utils";

export const styles = StyleSheet.create({
  mediaBox: {
    marginTop: Spacing.SCALE_12,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    borderStyle: "dashed",
    padding: Spacing.SCALE_10,
    borderRadius: 15,
  },
  mediaContainer: {
    marginTop: Spacing.SCALE_12,
  },
  mediaHeader: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontWeight: "400",
    marginBottom: 20,
  },
  modalHeader: {
    marginBottom: Spacing.SCALE_20,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalContainer: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  modalHeaderText: {
    color: Colors.DARK_GRAY_BLUE,
    fontFamily: Typography.FONT_POPPINS_BOLD,
    fontSize: Typography.FONT_SIZE_24,
    paddingRight: Spacing.SCALE_16,
    letterSpacing: 2,
    marginTop: Spacing.SCALE_40,
    marginBottom: Spacing.SCALE_10,
  },
});
