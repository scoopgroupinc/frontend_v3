import analytics from "@react-native-firebase/analytics";
import { useAnalytics } from "@segment/analytics-react-native";
import { methods } from "./constants";
import { IEvent, IScreen } from "./types";
import { selectUserId } from "../store/features/user/userSlice";
import { useAppSelector } from "../store/hooks";

export const logEvent = async (data: IEvent) => {
  await analytics().logEvent(data.eventName, { ...data.params });
};

export const onLogin = async () => {
  await analytics().logLogin({
    method: methods.scoopLogin,
  });
};

export const onSignUp = async () => {
  await analytics().logSignUp({
    method: methods.scoopSignup,
  });
};

export const onSelectContent = async (data: IEvent) => {
  await analytics().logSelectContent({
    content_type: data.eventName,
    item_id: data.params,
  });
};

export const onAppOpen = async () => {
  await analytics().logAppOpen();
};

export const onScreenView = async (event: IScreen) => {
  await analytics().logScreenView({
    screen_name: event.screenName,
    screen_class: event.screenType,
    userId: event.userId,
  });
};

export const useSegment = () => {
  const userId = useAppSelector(selectUserId);
  const { track, screen, identify } = useAnalytics();

  const trackEvent = (data: IEvent) => {
    track(data.eventName, { eventName: data.eventName, ...data.params, userId });
  };

  const screenEvent = (data: IScreen) => {
    screen("Page Viewed", {
      ...data,
      userId,
    });
  };

  const identifyEvent = (data: any) => {
    identify(userId, { ...data });
  };

  return { trackEvent, screenEvent, identifyEvent };
};
