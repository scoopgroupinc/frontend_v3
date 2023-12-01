import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { ProgressBar } from "react-native-paper";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { useSegment } from "../../../analytics";
import { eventNames, screenClass, analyticScreenNames } from "../../../analytics/constants";
import { AppButton } from "../../../components/atoms/AppButton";
import { screenName } from "../../../utils/constants";
import { styles } from "./styles";
import { NavigationScreenType } from "../../../types/globals";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const SendNotificationScreen = ({ navigation, route }: NavigationScreenType) => {
  const [showNotifications, setShowNotifications] = useState<boolean | null>(null);

  const analytics = useSegment();
  analytics.screenEvent({
    screenName: analyticScreenNames.onBoardNotification,
    screenType: screenClass.onBoarding,
  });

  const next = (state: boolean) => {
    analytics.trackEvent({
      eventName: eventNames.nextOnBoardNotificationButton,
      params: { screenClass: screenClass.onBoarding },
    });
    setShowNotifications(state);
  };

  // check why navigation is not working
  const fixMeLater = () => {
    navigation.navigate(screenName.QUESTION_PROMPT);
  };

  const requestNotifications = () => {
    const isAllowed = async () => {
      analytics.trackEvent({
        eventName: eventNames.notificationChoice,
        params: {
          notifications: true,
        },
      });
      navigation.navigate(screenName.QUESTION_PROMPT);
      next(true);
    };
    const isNotAllowed = async () => {
      analytics.trackEvent({
        eventName: eventNames.notificationChoice,
        params: {
          notifications: false,
        },
      });
      next(false);
    };

    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    }).then((permission) => {
      Alert.alert(
        "Scoop would like to send you Notifications",
        "Notifications may include alerts, sounds and icon badges. These can be configured in Settings",
        [
          {
            text: "Don't Allow",
            onPress: isNotAllowed,
            style: "cancel",
          },
          { text: "Allow", onPress: isAllowed },
        ]
      );
    });
  };

  // TODO: set progress
  return (
    <GradientLayout>
      <View style={styles.container}>
        <ProgressBar progress={0.9} color="#0E0E2C" />
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textHeader]}>Never miss a message</Text>
          <Text style={[styles.text, styles.textMinor]}>
            Allow notifications so you know when your received a message and a new match!
          </Text>
        </View>
        <AppButton onPress={fixMeLater}>Next</AppButton>
      </View>
    </GradientLayout>
  );
};

export default SendNotificationScreen;
