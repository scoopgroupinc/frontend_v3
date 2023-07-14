import { useEffect } from "react";
import { onScreenView } from "..";

interface IScreen {
  screenName: string;
  screenType: string;
  userId: string;
}

export const useOnScreenView = (event: IScreen) => {
  useEffect(() => {
    onScreenView(event);
  }, [event]);

  return [];
};
