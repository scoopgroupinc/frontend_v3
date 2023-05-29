import { StyleSheet } from "react-native";
import { Spacing, Typography, Colors } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.ADD_PHOTO_BG,
    borderRadius: 15,
    height: 90,
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    width: 90,
  },
  text: {
    fontSize: Typography.FONT_SIZE_24,
    color: Colors.WHITE,
  },
  imageContainer: {
    alignItems: "center",
    borderRadius: 15,
    height: 90,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 90,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  close: {
    position: "absolute",
    elevation: 10,
    zIndex: 10,
    right: 0,
    top: 0,
    borderRadius: 50,
  },
});
