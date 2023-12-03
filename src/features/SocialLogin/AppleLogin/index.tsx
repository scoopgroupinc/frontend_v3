import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useMutation } from "@apollo/client";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { VALIDATE_APPLE_CREDENTIALS } from "../../../services/graphql/auth/mutations";
import { useAppDispatch } from "../../../store/hooks";
import { storeObjectData, storeStringData } from "../../../utils/storage";
import { setUser } from "../../../store/features/user/userSlice";
import { navigationRef } from "../../../navigation/RootNavigation";
import { screenName } from "../../../utils/constants";
import { SECURE_STORE } from "../../../utils/constants/expo-sercure-storage-keys";
import { AppleAuthCredentialsInput } from "./types";

const APPLE_PROVIDER = "apple";
const AppleLogin = () => {
  const dispatch = useAppDispatch();
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [userToken, setUserToken] = useState<any>();
  const [validateAppleCredentials] = useMutation(VALIDATE_APPLE_CREDENTIALS);

  const navigateToAppleEmail = () => {
    navigationRef.current?.navigate(screenName.APPLE_EMAIL, {
      credential: JSON.stringify({ ...userToken, provider: APPLE_PROVIDER }),
    });
  };

  useEffect(() => {
    const checkAppleAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);

      if (isAvailable) {
        const credentialJson = await SecureStore.getItemAsync(SECURE_STORE.APPLE_CREDENTIALS);
        if (credentialJson) {
          setUserToken(JSON.parse(credentialJson || "{}"));
        }
      }
    };
    checkAppleAvailable();
  }, []);

  useEffect(() => {
    const checkAppleCredentials = async () => {
      try {
        const { data } = await validateAppleCredentials({
          variables: {
            credentials: userToken,
          },
        });

        if (data?.validateAppleCredentials?.user?.email) {
          const {
            validateAppleCredentials: { token, user },
          } = data || { validateAppleCredentials: {} };

          if (user && token) {
            await storeStringData("userToken", token);
            const userData = {
              ...user,
              token,
              providerUserId: userToken.id,
              provider: APPLE_PROVIDER,
            };
            await storeObjectData("user", userData);
            // Note once set, user will be redirected and considered logged in
            dispatch(
              setUser({
                user: userData,
              })
            );
          }
        } else {
          navigateToAppleEmail();
        }
      } catch (err: any) {
        // TOKEN is Expired or no good, do nothing
        // button will go refresh flow
        console.log("err", err);
      }
    };

    if (userToken) {
      const isExpired = jwtDecode(userToken?.identityToken)?.exp < Date.now() / 1000;
      if (!isExpired) {
        checkAppleCredentials();
      }
    }
  }, [userToken]);

  const signUp = async () => {
    try {
      const credential: AppleAuthCredentialsInput = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      SecureStore.setItemAsync(SECURE_STORE.APPLE_CREDENTIALS, JSON.stringify(credential));
      setUserToken(credential);
    } catch (err: any) {
      console.log("err", err);
      Alert.alert("Apple Sign Up Error", err.message);
    }
  };

  const refresh = async () => {
    try {
      const credential = await AppleAuthentication.refreshAsync(userToken?.user);
      SecureStore.setItemAsync(SECURE_STORE.APPLE_CREDENTIALS, JSON.stringify(credential));
      setUserToken(credential);
    } catch (err: any) {
      console.log("err", err);
      Alert.alert("Apple Sign In Error", err.message);
    }
  };

  const getAuthAppContent = () => {
    if (!userToken) {
      return (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={20}
          style={{
            width: "100%",
            height: 44,
          }}
          onPress={signUp}
        />
      );
    }

    // expired tokens
    return (
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
        cornerRadius={20}
        style={{
          width: "100%",
          height: 44,
        }}
        onPress={refresh}
      />
    );
  };

  return <View>{appleAuthAvailable && getAuthAppContent()}</View>;
};

export default AppleLogin;
