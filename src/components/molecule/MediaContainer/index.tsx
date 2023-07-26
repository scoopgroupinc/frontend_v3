import React, { useState } from "react";
import { View } from "react-native";
import { mapIndexToUserVisuals } from "../../../utils/helpers";
import { ScreenType } from "./types";
import { styles } from "./style";
import { MediaPicker } from "../../atoms/MediaPicker";

export const MediaContainer = ({ images = {}, onAddImage }: ScreenType) => {
  const number = 6;
  const initialData = [...Array(number)].map(mapIndexToUserVisuals);
  const [userVisuals, setUserVisuals] = useState(initialData);

  const mergedData = userVisuals.map((image, index) => ({
    ...image,
    ...images[index],
    videoOrPhoto: images[index] ? images[index]?.videoOrPhoto : undefined,
    file: images[index] ? images[index]?.file : undefined,
    blobName: images[index] ? images[index]?.blobName : undefined,
  }));

  return (
    <View style={styles.container}>
      {mergedData.map((el, index) => (
        <MediaPicker key={index} index={index} onChangeImage={onAddImage} item={el.videoOrPhoto} />
      ))}
    </View>
  );
};
