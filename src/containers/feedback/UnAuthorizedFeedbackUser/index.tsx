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
        Sign in and keep your Karma points
      </Text>
    </View>
    <View style={styles.buttonsBody}>
      <AppButton
        style={[
          styles.btn,
          {
            backgroundColor: "#4267B2",
          },
        ]}
      >
        Facebook
      </AppButton>
      <AppButton style={styles.btn}>Google</AppButton>
      <AppButton
        style={[
          styles.btn,
          {
            backgroundColor: "black",
          },
        ]}
      >
        Apple
      </AppButton>
    </View>
  </GradientLayout>
);

export default UnAuthorizedFeedbackUser;
