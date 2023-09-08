import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationCredential } from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";
import { useMutation } from "@apollo/client";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { AppButton } from "../../atoms/AppButton";
import { PROVIDER_LOGIN } from "../../../services/graphql/auth/mutations";
import { useAppDispatch } from "../../../store/hooks";
import { storeObjectData, storeStringData } from "../../../utils/storage";
import { setUser } from "../../../store/features/user/userSlice";
import { navigationRef } from "../../../navigation/RootNavigation";
import { screenName } from "../../../utils/constants";

WebBrowser.maybeCompleteAuthSession();

const SocialLogins = () => {
  const dispatch = useAppDispatch();
  const [providerUser, setProviderUser] = useState<any>({});

  GoogleSignin.configure({
    webClientId: "474530368865-qa6pks2e2s41ivpmk8i19el59qns2pb9.apps.googleusercontent.com",
    iosClientId: "474530368865-87k3pk487b6tb58q49moahprr9usd3f2.apps.googleusercontent.com",
  });

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { email, id } = userInfo.user;
      setProviderUser({ email, id, provider: "google" });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Sign In is in Progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services Not Available or Outdated");
      } else {
        console.log("Some Other Error Happened");
      }
    }
  };

  const [loginWithProvider] = useMutation(PROVIDER_LOGIN);

  // const handleAppleAuthentication = async () => {
  //   try {
  //     const credential: AppleAuthenticationCredential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //       ],
  //     });

  //     const { email, user: id } = credential;
  //     setProviderUser({ email, id, provider: "apple" });
  //   } catch (err: any) {
  //     // Alert.alert("Apple Authentication Error", err.message);
  //   }
  // };

  const fetchAppleEmail = async () => {
    try {
      const credential: AppleAuthenticationCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log("credential", credential);

      const { email, user: id } = credential;
      if (email) {
        console.log("email", email);
        const localStorageCredentials = await storeStringData(
          "appleCredentials",
          JSON.stringify(credential)
        );
        setProviderUser({ email, id, provider: "apple" });
      } else {
        navigationRef.current?.navigate(screenName.APPLE_EMAIL, { id });
      }
    } catch (err: any) {
      // Alert.alert("Apple Authentication Error", err.message);
    }
  };

  const checkAppleLoginStatus = async () => {
    try {
      const credentialState = await AppleAuthentication.getCredentialStateAsync("");
      if (credentialState === AppleAuthentication.AppleAuthenticationCredentialState.AUTHORIZED) {
        console.log("Apple Authorized");
        fetchAppleEmail();
      } else {
        console.log("Apple Not Authorized");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkAppleLoginStatus();
  }, []);

  useEffect(() => {
    const loginUser = async () => {
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
          await storeObjectData("user", {
            ...user,
            token,
            provider: providerUser.provider,
          }).then(() => {
            // Note once set, user will be redirected and considered logged in
            dispatch(
              setUser({
                user: {
                  ...user,
                  token,
                },
              })
            );
          });
        }
      } catch (err: any) {
        Alert.alert("Login Error", err.message);
      }
    };
    if (providerUser?.email && providerUser?.id) {
      loginUser();
    }
  }, [providerUser, loginWithProvider, dispatch]);

  return (
    <View>
      <AppButton
        style={{ marginVertical: 8 }}
        onPress={() => {
          googleSignIn();
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
        onPress={fetchAppleEmail}
      />
    </View>
  );
};

export default SocialLogins;
