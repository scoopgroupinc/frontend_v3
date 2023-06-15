import crashlytics from "@react-native-firebase/crashlytics";
import { useState } from "react";

export const useCrashState = () => {
  const [enabled, setEnabled] = useState(crashlytics().isCrashlyticsCollectionEnabled);

  function setCrash(value: boolean) {
    crashlytics()
      .setCrashlyticsCollectionEnabled(value)
      .then(() => {
        setEnabled(crashlytics().isCrashlyticsCollectionEnabled);
      });
  }

  return [enabled, setCrash] as const;
};
