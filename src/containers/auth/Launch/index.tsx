/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { VStack } from "native-base";
// import * as AuthSession from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";

import * as WebBrowser from "expo-web-browser";

import axios from "axios";
import { AppButton } from "../../../components/atoms/AppButton";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { screenName } from "../../../utils/constants";
import { OAUTH } from "../../../utils/constants/apis";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";

WebBrowser.maybeCompleteAuthSession();

const Launch = () => {

  const [user, setUser] = useState<any>(null);
  const [appleUser, setAppleUser] = useState<any>(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "136276392801515",
  });

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: OAUTH.EXPO_CLIENT_ID,
    androidClientId: OAUTH.ANDROID_GOOGLE_GUID,
    iosClientId: OAUTH.IOS_GOOGLE_GUID,
  });

  useOnScreenView({screenName:analyticScreenNames.welcome,
    screenType:screenClass.auth});

  // if (request) {
  //   console.log(
  //     `You need to add this url to your authorized redirect urls on your Facebook app: ${request.redirectUri}`
  //   );
  // }

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response?.authentication?.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  }, [response]);

  useEffect(() => {
    if (googleResponse && googleResponse.type === "success") {
      (async () => {
        const userInfoResponse = await axios
          .get("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
              Authorization: `Bearer ${googleResponse?.authentication?.accessToken}`,
            },
          })
          .then((res) => res.data)
          .catch((err) => console.log(err));
        setUser(userInfoResponse);
      })();
    }
  }, [googleResponse]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
    }
  };

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onSignUpPress = () => {
    navigation.navigate(screenName.REGISTER);
  };
  const onSignInPress = () => {
    navigation.navigate(screenName.LOGIN);
  };

  return (
    <GradientLayout>
      <View style={[styles.container]}>
        <Image
          source={require("../../../assets/images/scoop-logo.png")}
          style={{ height: 250, width: 250 }}
        />
        <Text style={styles.title}>SCOOP UPDATE</Text>
        <Text style={styles.blur}>Date Smarter. Live Fuller.</Text>
      </View>
      <VStack space={4} style={[styles.btnContainer]}>
        <>
          <AppButton isDisabled={!request} onPress={handlePressAsync} colorScheme="blue">
            Sign in with Facebook
          </AppButton>
          <AppButton
            isDisabled={!googleRequest}
            onPress={() => {
              googlePromptAsync();
            }}
            colorScheme="blue"
          >
            Sign in with Google
          </AppButton>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
            cornerRadius={20}
            style={{
              width: "100%",
              height: 44,
            }}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  ],
                });
                // console.log("credential", credential);
                setAppleUser(credential);
                // signed in
              } catch (e) {
                if (e.code === "ERR_REQUEST_CANCELED") {
                  // handle that the user canceled the sign-in flow
                } else {
                  // handle other errors
                }
              }
            }}
          />
        </>
        <AppButton onPress={onSignUpPress}>Create Account</AppButton>
        <AppButton
          onPress={onSignInPress}
          variant="ghost"
          // onPress={async () => {
          //   await AppleAuthentication.signOutAsync({
          //     user: appleUser.user,
          //   });
          // }}
        >
          Sign In
        </AppButton>
      </VStack>
    </GradientLayout>
  );
};

export default Launch;
