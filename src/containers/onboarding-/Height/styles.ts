import { StyleSheet } from "react-native";
import { Spacing, Typography, Colors } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  thumb: {
    backgroundColor: "#f8a1d6",
    borderColor: "#a4126e",
    borderRadius: 10,
    borderWidth: 5,
    height: 20,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    width: 20,
  },
  track: {
    backgroundColor: Colors.WHITE,
    borderRadius: 4,
    height: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },

  sliderContainer: {
    flex: 1,
    paddingVertical: 16,
    marginTop: Spacing.SCALE_30,
    justifyContent: "flex-start",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  caption: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_30,
    color: Colors.WHITE,
    marginTop: Spacing.SCALE_24,
    marginBottom: Spacing.SCALE_40,
  },
  value: {
    fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
    fontSize: Typography.FONT_SIZE_24,
    color: Colors.WHITE,
    marginTop: Spacing.SCALE_24,
    marginBottom: Spacing.SCALE_40,
  },
});
