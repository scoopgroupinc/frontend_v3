import analytics from "@react-native-firebase/analytics";
import { methods } from "./constants";

interface IEvent {
  eventName: string;
  params?: any;
}

interface IScreen {
  screenName: string;
  screenType: string;
}

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
  });
};
