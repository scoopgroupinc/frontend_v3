import React from "react";
import { Image, Text, View } from "react-native";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";

const FeedbackSplash = () => (
  <GradientLayout>
    <View style={styles.body}>
      <Image
        source={require("../../../assets/images/scoop-logo.png")}
        style={{ height: 80, width: 80 }}
      />
      <Image
        source={require("../../../assets/images/natalie.jpeg")}
        style={{ height: 160, width: 160, borderRadius: 100 }}
      />
      <View style={styles.requestBody}>
        <Text style={styles.title}>I want your opinion</Text>
        <Image
          source={require("../../../assets/images/back-tears.png")}
          style={{ height: 80, width: 80, borderRadius: 100 }}
        />
        <Text style={styles.title}>Please help me grow while dating!</Text>
      </View>
    </View>
    <View style={styles.buttonsBody}>
      <AppButton style={styles.btn}>Accept Request</AppButton>
      <AppButton style={styles.btn}>Decline Request</AppButton>
    </View>
  </GradientLayout>
);

export default FeedbackSplash;
