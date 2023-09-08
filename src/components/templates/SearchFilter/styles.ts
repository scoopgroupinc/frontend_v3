import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cancel: {
    fontSize: 18,
    marginLeft: 10,
  },
  container: {
    marginBottom: 30,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
