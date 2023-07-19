import React from "react";
import { Text, View } from "react-native";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { Typography } from "../../../utils";

const UnAuthorizedFeedbackUser = () => (
  <GradientLayout>
    <View style={styles.body}>
      <Text style={[styles.title, { fontFamily: Typography.FONT_POPPINS_REGULAR }]}>THANK YOU</Text>
      <Text style={[styles.title, { fontSize: 20, marginTop: 40 }]}>
        You just got some good karma!
      </Text>
      <Text style={styles.title}>Get feedback too!</Text>
    </View>
    <View style={styles.buttonsBody}>
      <AppButton style={styles.btn}>Get Share Link</AppButton>
      <AppButton style={styles.btn}>Preview Profile</AppButton>
      <AppButton style={styles.btn}>Continue Editing Profile</AppButton>
    </View>
  </GradientLayout>
);

export default UnAuthorizedFeedbackUser;
