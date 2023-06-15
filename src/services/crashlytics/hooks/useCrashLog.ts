import crashlytics from "@react-native-firebase/crashlytics";
import { useEffect } from "react";

export const useCrashLog = (text: string) => {
  useEffect(() => {
    crashlytics().log(text);
  }, [text]);
};
