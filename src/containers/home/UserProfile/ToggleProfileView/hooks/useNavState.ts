import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import { screenName } from "../../../../../utils/constants";

export const useNavState = (isEditView: boolean) => {
  const [isPreview, setIsPreview] = useState(!isEditView);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    if (isEditView) {
      navigation.navigate(screenName.USER_PROFILE_EDIT);
      setIsPreview(false);
    } else {
      navigation.navigate(screenName.USER_PROFILE_VIEW);
      setIsPreview(true);
    }
  }, [navigation, isEditView]);

  const items = useMemo(
    () => [
      {
        id: 1,
        name: "Edit",
        icon: "pencil",
        onPress: () => {
          navigation.navigate(screenName.USER_PROFILE_EDIT);
          setIsPreview(false);
        },
        isSelected: !isPreview,
      },
      {
        id: 2,
        name: "View",
        icon: "eye-outline",
        onPress: () => {
          navigation.navigate(screenName.USER_PROFILE_VIEW);
          setIsPreview(true);
        },
        isSelected: isPreview,
      },
    ],
    [navigation, isPreview, setIsPreview]
  );

  return [items];
};
