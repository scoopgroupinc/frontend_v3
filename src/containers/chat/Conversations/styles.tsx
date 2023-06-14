import { StyleSheet } from "react-native";
import { Typography } from "../../../utils";

const styles = StyleSheet.create({
  subHeader: {
    backgroundColor: "#ff7648",
    color: "white",
    padding: 10,
    marginBottom: 5,
    height: 50,
    fontSize: Typography.FONT_SIZE_18,
  },

  searchBar: {
    height: 45,
    color: "black",
    fontSize: Typography.FONT_SIZE_14,
  },

  subtitleView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  lastActive: {
    paddingLeft: 10,
    color: "grey",
    marginBottom: 5,
  },

  content: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },

  image: {
    alignSelf: "center",
    backgroundColor: "white",
  },
});

export default styles;
