import { Colors } from "../../../utils";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  avatarCon: {
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 80,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.TEAL,
  },
  profileLevel: {
    position: "absolute",
    top: 0,
    right: "35%",
    backgroundColor: Colors.TEAL,
    borderRadius: 100,
    padding: 5,
  },
});
