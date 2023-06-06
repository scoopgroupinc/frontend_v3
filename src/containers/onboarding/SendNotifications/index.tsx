import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { GradientLayout } from "src/components/layout/GradientLayout";
import { styles } from "./styles";
import * as Notifications from "expo-notifications";
import { ProgressBar } from "react-native-paper";
import { NavigationScreenType } from "src/types/globals";
import { ONBOARD_NAVIGATION } from "src/navigations/utils/CONSTANTS";
import { completeScreen, COMPLETE_SCREEN } from "../../onboardHandler/utils";
import { Colors } from "src/styles";
import { SubmissionBtn } from "src/components/atoms/SubmissionButton";
import { logEvent, onScreenView } from "src/analytics";
import { eventNames, screenClass, screenNames } from "src/analytics/constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const SendNotificationScreen = ({ navigation, route }: NavigationScreenType) => {
  const [showNotifications, setShowNotifications] = useState<boolean | null>(null);

  let screenProgress = COMPLETE_SCREEN.find(
    (item) => item.name === ONBOARD_NAVIGATION.NOTIFICATIONS
  )?.progress;

  useEffect(() => {
    onScreenView({
      screenName: screenNames.onBoardNotification,
      screenType: screenClass.onBoarding,
    });
  }, []);
  const next = (state: boolean) => {
    logEvent({
      eventName: eventNames.nextOnBoardNotificationButton,
      params: { screenClass: screenClass.onBoarding },
    });
    setShowNotifications(state);
  };

  //check why navigation is not working
  const fixMeLater = () => {
    completeScreen(ONBOARD_NAVIGATION.NOTIFICATIONS);
    navigation.navigate(ONBOARD_NAVIGATION.QUESTION_PROMPT);
  };

  const requestNotifications = () => {
    const isAllowed = async () => {
      logEvent({
        eventName: eventNames.allowOnBoardNotificationButton,
        params: {},
      });
      completeScreen(ONBOARD_NAVIGATION.NOTIFICATIONS);
      navigation.navigate(ONBOARD_NAVIGATION.QUESTION_PROMPT);
      next(true);
    };
    const isNotAllowed = async () => {
      logEvent({
        eventName: eventNames.dontAllowOnBoardNotificationButton,
        params: {},
      });
      next(false);
      completeScreen(ONBOARD_NAVIGATION.NOTIFICATIONS);
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

  return (
    <GradientLayout>
      <View style={styles.container}>
        <ProgressBar progress={screenProgress} color={"#0E0E2C"} />
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textHeader]}>Never miss a message</Text>
          <Text style={[styles.text, styles.textMinor]}>
            Allow notifications so you know when your received a message and a new match!
          </Text>
        </View>
        <SubmissionBtn
          title={"Next"}
          style={{
            backgroundColor: Colors.WHITE,
          }}
          onPress={fixMeLater}
        />
      </View>
    </GradientLayout>
  );
};
