import { StyleSheet } from "react-native";
import { Colors } from "../../../utils";

export const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    padding: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  tagsBody: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  author: {
    alignSelf: "flex-end",
    fontSize: 13,
    color: Colors.SLATE,
  },
  dateTime: {
    fontSize: 10,
    color: Colors.SLATE,
  },
});
