import { Image, Text, View } from "react-native";
import React from "react";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";

const ShareForFeedback = () => (
  <GradientLayout>
    <View style={styles.headingBody}>
      <Image
        source={require("../../../assets/images/scoop-logo.png")}
        style={{ height: 250, width: 250 }}
      />
      <View style={styles.textBody}>
        <Text style={styles.title}>Share your profile and get feedback</Text>
      </View>
    </View>
    <View style={styles.buttonsBody}>
      <AppButton style={styles.btn}>Get Share Link</AppButton>
      <AppButton style={styles.btn}>Profile View</AppButton>
      <AppButton style={styles.btn}>Continue Editing Profile</AppButton>
    </View>
  </GradientLayout>
);

export default ShareForFeedback;
