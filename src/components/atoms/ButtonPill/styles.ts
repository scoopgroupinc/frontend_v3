import { StyleSheet } from "react-native";
import { Colors } from "../../../utils";

export const styles = StyleSheet.create({
  body: {
    backgroundColor: "transparent",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 8,
    marginRight: 8,
  },
  disabled: {
    backgroundColor: Colors.SLATE,
  },
  selectedButton: {
    backgroundColor: "#fff",
  },
});
