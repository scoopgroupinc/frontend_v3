import { useEffect } from "react";
import { onScreenView } from "../analytics";

interface IScreen {
  screenName: string;
  screenType: string;
}

export const useOnScreenView = (event: IScreen) => {
  useEffect(() => {
    onScreenView(event);
  }, [event]);

  return [];
};
