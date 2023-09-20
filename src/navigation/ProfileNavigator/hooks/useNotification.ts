import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../../../hooks/useNotification";
import { useAppSelector } from "../../../store/hooks";
import notificationAxios from "../../../services/axios/notificationAxios";
import { selectUserId } from "../../../store/features/user/userSlice";

export const useNotification = () => {
  const { handleNotificationResponse, registerForPushNotificationsAsync } = useNotifications();

  const userId = useAppSelector(selectUserId);

  const saveNotificationToken = useCallback(
    async (id: string) => {
      const notificationToken = await registerForPushNotificationsAsync();
      if (notificationToken) {
        await notificationAxios.put("deviceToken", {
          notificationToken,
          osType: Platform.OS,
          version: Platform.Version,
          userId: id,
        });
      }
    },
    [registerForPushNotificationsAsync]
  );

  useEffect(() => {
    if (userId) {
      saveNotificationToken(userId);
    }
  }, [userId, saveNotificationToken]);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const notifyMe = Notifications.addNotificationReceivedListener((notification) => {
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );

    return () => {
      if (responseListener) Notifications.removeNotificationSubscription(responseListener);
      if (notifyMe) Notifications.removeNotificationSubscription(notifyMe);
    };
  }, [handleNotificationResponse]);

  // I've used to test the theory that notification sync with the backend doesn't work yet
  // with this local notification, I've confirmed that the notification is working
  useEffect(() => {
    async function schedulePushNotification() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: "Here is the notification body",
          data: { data: "goes here" },
        },
        trigger: { seconds: 2 },
      });
    }

    schedulePushNotification();
  }, []);

  return [];
};
