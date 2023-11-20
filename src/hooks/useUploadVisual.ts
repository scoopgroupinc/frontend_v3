import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { Alert } from "react-native";
import { selectUserId, selectUserVisuals, setUserVisuals } from "../store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { URLS } from "../utils/constants/apis";

export const useUploadVisuals = (): [
  (image: any) => Promise<FileSystem.FileSystemUploadResult | null | undefined>,
  boolean
] => {
  const userVisuals = useAppSelector(selectUserVisuals);
  const userId = useAppSelector(selectUserId);
  const [loading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const onAddImage = async (image: any) => {
    try {
      if (image) {
        setIsLoading(true);
        const response = await FileSystem.uploadAsync(
          `${process.env.EXPO_PUBLIC_FILE_SERVICE_URL}/api/v1/visuals/upload/${userId}`,
          image.imageUri,
          {
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "file",
          }
        );
        const responseBody = JSON.parse(response.body);

        const newVisuals = { ...userVisuals };
        newVisuals[image.index] = {
          order: image.index,
          userId,
          videoOrPhoto: image.imageUri,
          file: responseBody.file, // keep blob sas url until saved
          blobName: responseBody.Key,
        };

        dispatch(
          setUserVisuals({
            userVisuals: newVisuals,
          })
        );
        setIsLoading(false);
        return response;
      }
      return null;
    } catch (err) {
      Alert.alert(`Error: ${err}`);
    }
  };

  return [onAddImage, loading];
};
