import { StyleSheet } from "react-native";
import { Colors, Typography, Spacing } from "../../../../utils";

export const styles = StyleSheet.create({
  topContainer: {},
  topButton: {
    width: 100,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  divider: {
    borderBottomColor: Colors.WHITE,
    borderBottomWidth: 1,
    marginVertical: 30,
  },
  textContainer: {
    marginTop: Spacing.SCALE_16,
    marginBottom: Spacing.SCALE_16,
    alignItems: "center",
  },
  mediaText: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_12,
    fontWeight: "400",
    marginBottom: 20,
  },
  modalText: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    color: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_16,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  buttons: {
    width: "50%",
    marginRight: 10,
    marginLeft: 10,
    marginBottom: -20,
  },
  editButton: {
    backgroundColor: Colors.RUST,
  },
  confirmButton: {
    backgroundColor: Colors.TEAL,
  },
});
