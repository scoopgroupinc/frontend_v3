import { StyleSheet } from "react-native";
import { Typography } from "../../../utils";

export const styles = StyleSheet.create({
  cancel: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
  container: {
    marginBottom: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
