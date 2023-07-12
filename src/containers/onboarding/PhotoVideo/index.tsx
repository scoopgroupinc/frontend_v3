/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heading, VStack } from "native-base";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { styles } from "./styles";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { URLS } from "../../../utils/constants/apis";
import { screenName } from "../../../utils/constants";
import { AppButton } from "../../../components/atoms/AppButton";
import { MediaContainer } from "../../../components/molecule/MediaContainer";
import { setUserVisuals } from "../../../store/features/user/userSlice";
import { logEvent, onScreenView } from "../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";

export const PhotoVideoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;
  const dispatch = useAppDispatch();

  const [allImages, setImages] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useOnScreenView({screenName:analyticScreenNames.onBoardPhotos,
    screenType:screenClass.onBoarding});

  const getVisuals = async () => {
    axios
      .get(`${URLS.FILE_URL}/api/v1/visuals/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      })
      .then((res) => {
        dispatch(
          setUserVisuals({
            userVisuals: res.data,
          })
        );
      })
      .catch((err) => {
        Alert.alert("Error", err.message || "Something went wrong!");
      });
  };

  const handleImages = (image: any) => {
    const newImages = [...allImages];
    newImages[image.index] = {
      videoOrPhoto: image.imageUri,
    };
    setImages(newImages);
  };

  const handleSaveImages = async (img: any) => {
    if (img) {
      const postUrl = URLS.FILE_URL;
      await FileSystem.uploadAsync(`${postUrl}/api/v1/visuals/uploadvisuals/${userId}`, img, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "files",
      })
        .then(async (response) => {
          if (response.status === 201) {
            await getVisuals();
          }
        })
        .catch((error) => {
          Alert.alert(`Error: ${error}`);
        });
    }
    logEvent({
      eventName: eventNames.editOnBoardPhotosButton,
      params: { screenClass: screenClass.onBoarding },
    });
  };

  const saveImages = async () => {
    setIsLoading(true);
    logEvent({
      eventName: eventNames.addOnBoardPhotosButton,
      params: {},
    });
    const imageArray = [...allImages];
    // save the image to DB
    await Promise.all(imageArray.map(async (image: any) => handleSaveImages(image?.videoOrPhoto)))
      .then(async () => {
        setIsLoading(false);
        navigation.navigate(screenName.QUESTION_PROMPT);
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert(`Error: ${error}`);
      });
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <GradientLayout>
        <VStack space={12}>
          <ProgressBar progress={0.6} color="#0E0E2C" />
          <Heading>Photos & Videos</Heading>
          <MediaContainer images={allImages} onAddImage={handleImages} />
          <AppButton isDisabled={allImages && allImages.length < 1} onPress={() => saveImages()}>
            Upload Photos
          </AppButton>
        </VStack>
      </GradientLayout>
    </>
  );
};
