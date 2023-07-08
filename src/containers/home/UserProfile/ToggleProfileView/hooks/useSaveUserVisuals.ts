import * as FileSystem from "expo-file-system";
import {
  selectisUserVisualsDirty,
  selectUserId,
  selectUserVisuals,
  setUserVisuals,
} from "../../../../../store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { URLS } from "../../../../../utils/constants/apis";

export const useSaveUserVisuals = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const userVisuals = useAppSelector(selectUserVisuals);
  const isUserVisualsDirty = useAppSelector(selectisUserVisualsDirty);

  const handleUserVisuals = (image: any) => {
    const newImages = [...userVisuals];
    newImages[image.index] = {
      videoOrPhoto: image.imageUri,
    };
    dispatch(
      setUserVisuals({
        userVisuals: newImages,
      })
    );
  };

  const handleSaveImages = async (img: any) => {
    if (img.includes("file://")) {
      return FileSystem.uploadAsync(
        `${URLS.FILE_URL}/api/v1/visuals/uploadvisuals/${userId}`,
        img,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "files",
        }
      );
    }
  };

  const saveVisuals = async () => {
    const imageArray = [...userVisuals];
    return Promise.all(imageArray.map(async (image: any) => handleSaveImages(image.videoOrPhoto)));
  };

  return [isUserVisualsDirty ? saveVisuals : null];
};
