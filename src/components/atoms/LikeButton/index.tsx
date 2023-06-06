import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { RenderSvg } from "../../../utils/svgs/RenderSvg";
import { likeBtnSvg } from "../../../utils/svgs/icons";

interface ILikeButton {
  width?: number;
  height?: number;
  like?: () => void;
}

const LikeButton = ({ width, height, like }: ILikeButton) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={like}>
        <RenderSvg
          originX={0}
          originY={0}
          width={42}
          height={39}
          fill="none"
          children={likeBtnSvg()}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LikeButton;
