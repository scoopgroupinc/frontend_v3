/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { Icon, VStack } from "native-base";

// import * as AuthSession from "expo-auth-session";
// import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationCredential } from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "../../../components/atoms/AppButton";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { OAUTH } from "../../../utils/constants/apis";
import { PROVIDER_LOGIN } from "../../../services/graphql/auth/mutations";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import { useAppDispatch } from "../../../store/hooks";
import { storeStringData } from "../../../utils/storage";
import { setUser } from "../../../store/features/user/userSlice";

WebBrowser.maybeCompleteAuthSession();

const Launch = () => {
  const dispatch = useAppDispatch();

  useOnScreenView({ screenName: analyticScreenNames.welcome, screenType: screenClass.auth });

  const [loginWithProvider] = useMutation(PROVIDER_LOGIN);

  // const [request, response, promptAsync] = Facebook.useAuthRequest({
  //   clientId: OAUTH.FACEBOOK_CLIENT_ID,
  // });

  // useEffect(() => {
  //   if (response && response.type === "success" && response.authentication) {
  //     (async () => {
  //       const userInfoResponse = await fetch(
  //         `https://graph.facebook.com/me?access_token=${response?.authentication?.accessToken}&fields=id,name,picture.type(large)`
  //       );
  //       const userInfo = await userInfoResponse.json();
  //       dispatch(setUser(userInfo));
  //       console.log("response", response);
  //     })();
  //   }
  // }, [response, dispatch]);

  const [providerUser, setProviderUser] = useState<any>({});

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: OAUTH.EXPO_CLIENT_ID,
    androidClientId: OAUTH.ANDROID_GOOGLE_GUID,
    iosClientId: OAUTH.IOS_GOOGLE_GUID,
  });

  useEffect(() => {
    const fetchGoogleData = async () => {
      try {
        const userInfoResponse = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
          headers: {
            Authorization: `Bearer ${googleResponse?.authentication?.accessToken}`,
          },
        });

        const { email, id } = userInfoResponse.data;
        setProviderUser({ email, id, provider: "google" });
      } catch (err) {
        console.log("err", err);
        Alert.alert("Google Authentication Error", err.message);
      }
    };
    if (googleResponse?.authentication?.accessToken) {
      fetchGoogleData();
    }
  }, [googleResponse]);

  const handleAppleAuthentication = async () => {
    try {
      const credential: AppleAuthenticationCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const { email, user: id } = credential;
      setProviderUser({ email, id, provider: "apple" });
    } catch (err) {
      console.log("err", err);
      Alert.alert("Apple Authentication Error", err.message);
    }
  };

  useEffect(() => {
    const login = async () => {
      try {
        const loginResponse = await loginWithProvider({
          variables: {
            authProviderInput: {
              email: providerUser.email,
              id: providerUser.id,
              provider: providerUser.provider,
            },
          },
        });

        const user = loginResponse?.data?.loginWithProvider?.user;
        const token = loginResponse?.data?.loginWithProvider?.token;

        if (user && token) {
          await storeStringData("userToken", token);

          // Note once set, user will be redirected and considered logged in
          dispatch(
            setUser({
              user: {
                ...user,
                token,
              },
            })
          );
        }
      } catch (err) {
        console.log("err", err);
        Alert.alert("Login Error", err.message);
      }
    };
    if (providerUser?.email && providerUser?.id) {
      login();
    }
  }, [providerUser, loginWithProvider, dispatch]);

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
          {/* Hide facebook login for now */}
          {/* <AppButton
              isDisabled={!request}
              onPress={handlePressAsync}
              colorScheme="blue"
              leftIcon={<Icon as={Ionicons} name="logo-facebook" size="sm" />}
            >
              Continue with Facebook
            </AppButton> */}
          <AppButton
            isDisabled={!googleRequest}
            onPress={() => {
              googlePromptAsync();
            }}
            colorScheme="coolGray"
            leftIcon={<Icon as={Ionicons} name="logo-google" size="sm" />}
          >
            Continue with Google
          </AppButton>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
            cornerRadius={20}
            style={{
              width: "100%",
              height: 44,
            }}
            onPress={handleAppleAuthentication}
          />
        </>
        {/* <AppButton onPress={onSignUpPress}>Create Account</AppButton> */}
        {/* <AppButton
            onPress={onSignInPress}
            variant="ghost"
            onPress={async () => {
              await AppleAuthentication.signOutAsync({
                user: appleUser.user,
              });
            }}
          >
            Sign In
          </AppButton> */}
      </VStack>
    </GradientLayout>
  );
};

export default Launch;
