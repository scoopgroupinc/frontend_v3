/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect } from "react";
import { View, Text, Image, Platform } from "react-native";
import { Icon, VStack } from "native-base";

// import * as AuthSession from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
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
import { useNotifications } from "../../../hooks/useNotification";
import notificationAxios from "../../../services/axios/notificationAxios";
import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/features/user/userSlice";
import { storeStringData } from "../../../utils/storage";

WebBrowser.maybeCompleteAuthSession();

const Launch = () => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: OAUTH.FACEBOOK_CLIENT_ID,
  });

  const [loginWithProvider] = useMutation(PROVIDER_LOGIN);

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: OAUTH.EXPO_CLIENT_ID,
    androidClientId: OAUTH.ANDROID_GOOGLE_GUID,
    iosClientId: OAUTH.IOS_GOOGLE_GUID,
  });

  // if (request) {
  //   console.log(
  //     `You need to add this url to your authorized redirect urls on your Facebook app: ${request.redirectUri}`
  //   );
  // }
  const dispatch = useAppDispatch();
  const { registerForPushNotificationsAsync } = useNotifications();

  const saveDeviceToken = useCallback(
    async (userId: string) => {
      const token = await registerForPushNotificationsAsync();
      if (userId && token) {
        const notificationData = {
          notificationToken: token,
          osType: Platform.OS,
          version: Platform.Version,
          userId,
        };
        await notificationAxios.put("deviceToken", notificationData);
      }
    },
    [registerForPushNotificationsAsync]
  );

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response?.authentication?.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
        console.log("response", response);
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { email, id } = userInfoResponse;
        loginWithProvider({
          variables: {
            AuthProviderInput: {
              email,
              id,
              provider: "google",
            },
          },
        })
          .then(async (res) => {
            await storeStringData("userToken", res?.data?.loginWithProvider?.token);
            dispatch(
              setUser({
                user: {
                  ...res?.data?.loginWithProvider?.user,
                  token: res?.data?.loginWithProvider?.token,
                },
              })
            );
            saveDeviceToken(res?.data?.loginWithProvider?.user.userId);
          })
          .catch((err) => console.log("mistake", err));
      })();
    }
  }, [googleResponse, loginWithProvider, dispatch, saveDeviceToken]);

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
            onPress={async () => {
              try {
                const credential: AppleAuthenticationCredential =
                  await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                loginWithProvider({
                  variables: {
                    AuthProviderInput: {
                      email: credential.email,
                      id: credential.user,
                      provider: "apple",
                    },
                  },
                })
                  .then(async (res) => {
                    console.log("response", res);
                    await storeStringData("userToken", res?.data?.loginWithProvider?.token);
                    dispatch(
                      setUser({
                        user: {
                          ...res?.data?.loginWithProvider?.user,
                          token: res?.data?.loginWithProvider?.token,
                        },
                      })
                    );
                    saveDeviceToken(res?.data?.loginWithProvider?.user.userId);
                  })
                  .catch((err) => console.log("mistake", err));
              } catch (err) {
                console.log("err", err);
              }
            }}
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
