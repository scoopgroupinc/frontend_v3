import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationCredential } from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { Icon, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "../../atoms/AppButton";
import { PROVIDER_LOGIN } from "../../../services/graphql/auth/mutations";
import { OAUTH } from "../../../utils/constants/apis";
import { useAppDispatch } from "../../../store/hooks";
import { storeStringData } from "../../../utils/storage";
import { setUser } from "../../../store/features/user/userSlice";
import { styles } from "./styles";
// import * as AuthSession from "expo-auth-session";
// import * as Facebook from "expo-auth-session/providers/facebook";

WebBrowser.maybeCompleteAuthSession();

const SocialLogins = () => {
  const dispatch = useAppDispatch();
  const [providerUser, setProviderUser] = useState<any>({});

  const [loginWithProvider] = useMutation(PROVIDER_LOGIN);

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
      } catch (err: any) {
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
    } catch (err: any) {
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
      } catch (err: any) {
        Alert.alert("Login Error", err.message);
      }
    };
    if (providerUser?.email && providerUser?.id) {
      login();
    }
  }, [providerUser, loginWithProvider, dispatch]);

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
  return (
    <View>
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
        style={{ marginVertical: 8 }}
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
    </View>
  );
};

export default SocialLogins;
