import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { screenName } from "../../../../../utils/constants";

export const useNavState = () => {
  const [isPreview, setIsPreview] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const items = [
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
  ];
  const [navState, setNavState] = useState(items);

  useEffect(() => {
    setNavState([...items]);
  }, [isPreview]);

  return [navState, setNavState];
};
