import React from "react";
import { View } from "react-native";
import { styles } from "./style";
import DislikeButton from "../../atoms/DislikeButton";
import LikeButton from "../../atoms/LikeButton";

const LikeButtonsView = ({
  like,
  dislike,
}: {
  like: () => void;
  dislike: () => void;
}) => {
  return (
    <View style={styles.container}>
      <DislikeButton dislike={dislike} />
      <LikeButton like={like} />
    </View>
  );
};

export default LikeButtonsView;
