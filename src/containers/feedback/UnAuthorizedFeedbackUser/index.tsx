import React from "react";
import { Text, View } from "react-native";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { Typography } from "../../../utils";
import SocialLogins from "../../../components/molecule/SocialLogins";

const UnAuthorizedFeedbackUser = () => (
  <GradientLayout>
    <View style={styles.body}>
      <Text style={[styles.title, { fontFamily: Typography.FONT_POPPINS_REGULAR }]}>THANK YOU</Text>
      <Text style={[styles.title, { fontSize: 20, marginTop: 40 }]}>
        Sign in and keep your Karma points
      </Text>
    </View>
    <View style={styles.buttonsBody}>
      {/* <AppButton style={styles.btn} colorScheme="blue">
        Facebook
      </AppButton>
      <AppButton style={styles.btn}>Google</AppButton>
      <AppButton style={styles.btn} colorScheme="coolGray">
        Apple
      </AppButton> */}
      <SocialLogins />
    </View>
  </GradientLayout>
);

export default UnAuthorizedFeedbackUser;
