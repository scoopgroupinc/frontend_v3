import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../../../hooks/useNotification";


export const useNotification = () => {
    const { handleNotificationResponse } = useNotifications();

    useEffect(() => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
  
      const notifyMe = Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });
  
      const responseListener = Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );
  
      return () => {
        if (responseListener) Notifications.removeNotificationSubscription(responseListener);
        if (notifyMe) Notifications.removeNotificationSubscription(notifyMe);
      };
    }, []);
  
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