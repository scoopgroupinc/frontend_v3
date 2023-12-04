import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { Typography } from "../../../utils";
import SocialLogins from "../../../components/molecule/SocialLogins";
import { useSegment } from "../../../analytics";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";

const UnAuthorizedFeedbackUser = () => {
  const analytics = useSegment();
  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.profileFeedbackThankYou,
      screenType: screenClass.feedback,
    });
  }, []);
  return (
    <GradientLayout>
      <View style={styles.body}>
        <Text style={[styles.title, { fontFamily: Typography.FONT_POPPINS_REGULAR }]}>
          THANK YOU
        </Text>
        <Text style={[styles.title, { fontSize: 20, marginTop: 40 }]}>
          Sign in and keep your Karma points
        </Text>
      </View>
      <View style={styles.buttonsBody}>
        <SocialLogins />
      </View>
    </GradientLayout>
  );
};

export default UnAuthorizedFeedbackUser;
