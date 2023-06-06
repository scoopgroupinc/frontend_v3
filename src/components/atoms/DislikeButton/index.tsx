import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { Colors } from "../../../utils";
import { RenderSvg } from "../../../utils/svgs/RenderSvg";
import { dislikeBtnSvg } from "../../../utils/svgs/icons";

interface IDislikeButton {
  width?: number;
  height?: number;
  bgColor?: string;
  shadowColor?: string;
  fill?: string;
  dislike?: () => void;
}
function DislikeButton({ dislike }: IDislikeButton) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.WHITE,
        width: 100,
        height: 100,
        elevation: 1,
        shadowColor: Colors.BLACK,
        shadowOpacity: 0.7,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 7,
        borderRadius: 100,
      }}
    >
      <TouchableOpacity onPress={dislike} style={styles.button}>
        <RenderSvg
          originX={0}
          originY={0}
          width={30}
          height={30}
          fill="none"
          children={dislikeBtnSvg({
            fill: "#8C9FB1",
            strokeWidth: "2",
            stroke: "#8C9FB1",
          })}
        />
      </TouchableOpacity>
    </View>
  );
}

export default DislikeButton;
