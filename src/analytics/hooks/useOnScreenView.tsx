import { useEffect } from "react";
import { onScreenView } from "..";
import { useAppSelector } from "../../store/hooks";
import { selectUserId } from "../../store/features/user/userSlice";

interface IScreen {
  screenName: string;
  screenType: string;
}

export const useOnScreenView = (event: IScreen) => {
  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    onScreenView({...event, userId });
  }, [event, userId]);

  return [];
};
