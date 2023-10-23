import React, { useState } from "react";
import { Text, View } from "react-native";
import { Input } from "native-base";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { Typography } from "../../../utils";
import SocialLogin from "../../../features/SocialLogin";

const UnAuthorizedFeedbackUser = () => (
  <GradientLayout>
    <View style={styles.body}>
      <Text style={[styles.title, { fontFamily: Typography.FONT_POPPINS_REGULAR }]}>THANK YOU</Text>
      <Text style={[styles.title, { fontSize: 20, marginTop: 40 }]}>
        Sign in and keep your Karma points
      </Text>
    </View>
    <View style={styles.buttonsBody}>
      <SocialLogin />
    </View>
  </GradientLayout>
);

export default UnAuthorizedFeedbackUser;
