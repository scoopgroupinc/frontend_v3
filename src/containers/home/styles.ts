import { StyleSheet } from "react-native";
import { Colors, Typography } from "../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setting: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  topContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  topButton: {
    width: 100,
  },
  title: {
    alignSelf: "center",
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_18,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
  topHeader: {
    display: "flex",
    flexDirection: "row",
  },
  imgDiv: {
    width: "40%",
    marginRight: 15,
  },
  img: {
    width: 150,
    height: 150,
    color: "white",
  },
  imgView: {
    position: "relative",
  },
  prompt: {
    fontWeight: "600",
    fontSize: Typography.FONT_SIZE_18,
    marginBottom: 10,
    marginTop: 35,
  },
  interaction: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
  },
  interactionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 25,
  },
  interactionCount: {},
  thumbsUp: {},
  thumbsDown: {},
  voteStats: {
    width: "60%",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  totalVotes: {
    marginTop: -20,
    color: Colors.RED,
    fontSize: Typography.FONT_SIZE_20,
    fontWeight: "bold",
  },
  midContent: {},
  bottomContent: {
    marginTop: 40,
    paddingTop: 20,
    borderTopColor: Colors.GRAY_BLUE,
    borderTopWidth: 1,
    display: "flex",
    flexDirection: "column",
    item: {
      paddingTop: 10,
    },
  },

  bestPhoto: {},
  bestPhotoTitle: {
    fontSize: Typography.FONT_SIZE_14,
    fontWeight: "400",
    marginBottom: 20,
  },
  bestPhotoImg: {
    width: "100%",
    height: 300,
  },
  bestPhotoTxt: {},
  errorText: {
    padding: 20,
  },
  tag: {
    position: "absolute",
  },
  tagTxt: {
    fontSize: Typography.FONT_SIZE_9,
    fontWeight: "700",
  },
  modalContainerHeader: {
    marginTop: "3%",
    marginBottom: 50,
  },
  modalHeading: {
    textAlign: "center",
    fontSize: Typography.FONT_SIZE_20,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  noticeBody: {
    marginVertical: 20,
    flexDirection: "row",
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
  },
  noticeText: {
    fontSize: 16,
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  },
});
