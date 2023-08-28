import { Alert, Share } from "react-native";

export const useShare = () => {
  const share = async (link: string) => {
    try {
      const result = await Share.share({
        message: `https://scoop.love/app/${link}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return { share };
};
