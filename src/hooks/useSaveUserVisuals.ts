import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import {
  selectisUserVisualsDirty,
  selectUserId,
  selectUserVisuals,
  setUserVisuals,
} from "../store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { URLS } from "../utils/constants/apis";

export const useSaveUserVisuals = (): [() => Promise<any>, boolean] => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);
  const userVisuals = useAppSelector(selectUserVisuals);
  const isUserVisualsDirty = useAppSelector(selectisUserVisualsDirty);

  const [loading, setIsLoading] = useState(false);

  const saveVisuals = async () => {
    if (userVisuals && isUserVisualsDirty) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${URLS.FILE_URL}/api/v1/visuals/save/${userId}`,
          Object.keys(userVisuals)
            .sort((a, b) => Number(a) - Number(b))
            .map((key) => userVisuals[key]),
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setIsLoading(false);

        if (response.status === 201) {
          dispatch(setUserVisuals({ userVisuals: response.data }));

          return response.data; // Return the response data
        }
      } catch (error) {
        setIsLoading(false);
        Alert.alert(`Error: ${error}`);
      }
    }
    return null;
  };

  return [saveVisuals, loading];
};
