import React from "react";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import AppleLogin from "./AppleLogin";
import GoogleLogin from "./GoogleLogin";

WebBrowser.maybeCompleteAuthSession();

const SocialLogins = () => (
  <View>
    <GoogleLogin />
    <AppleLogin />
  </View>
);

export default SocialLogins;
