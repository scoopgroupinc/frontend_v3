/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heading, VStack } from "native-base";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { screenName } from "../../../utils/constants";
import { AppButton } from "../../../components/atoms/AppButton";
import { MediaContainer } from "../../../components/molecule/MediaContainer";
import {
  trackCurrentUserStateChanges,
  selectUserVisuals,
} from "../../../store/features/user/userSlice";
import { useSegment } from "../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";
import { useUploadVisuals } from "../../../hooks/useUploadVisual";
import { useSaveUserVisuals } from "../../../hooks/useSaveUserVisuals";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

export const PhotoVideoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userVisuals = useAppSelector(selectUserVisuals);

  const analytics = useSegment();
  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.onBoardPhotos,
      screenType: screenClass.onBoarding,
    });
  }, []);

  useEffect(() => {
    dispatch(trackCurrentUserStateChanges());
  }, [dispatch]);

  const [handleUploadImages, isUploading] = useUploadVisuals();
  const [handleSaveImages, isSaving] = useSaveUserVisuals();

  useEffect(() => {
    setIsLoading(isUploading);
  }, [isUploading]);

  useEffect(() => {
    setIsLoading(isSaving);
  }, [isSaving]);

  const saveImages = async () => {
    analytics.trackEvent({
      eventName: eventNames.addOnBoardPhotosButton,
      params: {},
    });

    await handleSaveImages();
    navigation.navigate(screenName.QUESTION_PROMPT);
  };

  const onAddImage = async (image: any) => {
    handleUploadImages(image);
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <GradientLayout>
        <VStack space={12}>
          <ProgressBar progress={0.6} color="#0E0E2C" />
          <Heading>Photos & Videos</Heading>
          <MediaContainer images={userVisuals} onAddImage={onAddImage} />
          <AppButton isDisabled={Object.values(userVisuals).length < 1} onPress={saveImages}>
            Upload Photos
          </AppButton>
        </VStack>
      </GradientLayout>
    </>
  );
};
