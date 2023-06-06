import React, { useState } from "react";
import { View, Image, Platform, TouchableWithoutFeedback } from "react-native";
import { Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import { Colors } from "../../../utils";

import { imageContainer, ScreenType } from "./types.d";

export const MediaPicker = ({ index, onChangeImage, item }: ScreenType) => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // handle image type conversion
      let imageResponse = result.assets[0].uri;
      if (
        Platform.OS === "ios" &&
        (imageResponse.endsWith(".heic") || imageResponse.endsWith(".HEIC"))
      ) {
        imageResponse = `${imageResponse.split(".")[0]}.JPG`;
      }
      onChangeImage({
        index,
        imageUri: imageResponse,
      });
      setImage(imageResponse);
    }
  };

  const replaceImage = async (index: number) => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // handle image type conversion
      let imageResponse = result.assets[0].uri;
      if (
        Platform.OS === "ios" &&
        (imageResponse.endsWith(".heic") || imageResponse.endsWith(".HEIC"))
      ) {
        imageResponse = `${imageResponse.split(".")[0]}.JPG`;
      }
      onChangeImage({
        index,
        imageUri: imageResponse,
      });
      setImage(imageResponse);
    }
  };

  const handlePress = (index: number) => {
    if (!image) pickImage();
    else replaceImage(index);
  };

  return (
    <TouchableWithoutFeedback onPress={() => handlePress(index)}>
      <View style={styles.container}>
        {!item && <Octicons name="plus" size={20} color={Colors.WHITE} />}
        {item && <Image source={{ uri: item }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};
