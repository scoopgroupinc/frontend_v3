/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, Platform, Modal, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heading, Icon, VStack } from "native-base";
// import * as AuthSession from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationCredential } from "expo-apple-authentication";
import jwtDecode from "jwt-decode";
import * as WebBrowser from "expo-web-browser";

import axios from "axios";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "../../../components/atoms/AppButton";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { OAUTH } from "../../../utils/constants/apis";
import { PROVIDER_LOGIN, VERIFY_PROVIDER_EMAIL } from "../../../services/graphql/auth/mutations";
import { useNotifications } from "../../../hooks/useNotification";
import notificationAxios from "../../../services/axios/notificationAxios";
import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/features/user/userSlice";
import { storeStringData } from "../../../utils/storage";
import { screenName } from "../../../utils/constants";
import FormField from "../../../components/molecule/FormField";
import { OTPInputModal } from "../../../components/templates/OTPInputModal";
import { Colors, Spacing, Typography } from "../../../utils";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const Launch = () => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: OAUTH.FACEBOOK_CLIENT_ID,
  });

  const [loginWithProvider, { data: loginWithProviderData, error }] = useMutation(PROVIDER_LOGIN);
  const [verifyProviderEmail, { data: verifyData, error: verifyError }] =
    useMutation(VERIFY_PROVIDER_EMAIL);

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

        loginWithProvider({
          variables: {
            AuthProviderInput: {
              providerName: "google",
              providerUserId: userInfoResponse.id,
              email: userInfoResponse.email,
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
          .catch((err) => console.log(err));
      })();
    }
  }, [googleResponse, loginWithProvider, dispatch, saveDeviceToken]);

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

  const [loading, setLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();
  const [modalState, setModalState] = useState<boolean>(false);
  const [revalidate, setRevalidate] = useState<boolean>(true);
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const NullEmailAlert = () =>
    Alert.alert("Email is hidden", "Scoop needs your email address to proceed!", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => setIsVisible(true) },
    ]);

  useEffect(() => {
    if (verifyData) {
      const { status, data } = verifyData?.verifyProviderEmail;
      if (status === "SUCCESS") {
        setIsVisible(false);
        setLoading(false);
        setModalState(true);
      }

      if (status === "USER_ALREADY_EXISTS") {
        setIsVisible(false);
        setLoading(false);
        storeStringData("userToken", data?.token);
        dispatch(
          setUser({
            user: {
              ...data?.user,
              token: data?.token,
            },
          })
        );
      }
    }
  }, [verifyData, userData, dispatch]);

  return (
    <>
      <AppActivityIndicator visible={loading} />
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
            <AppButton
              isDisabled={!request}
              onPress={handlePressAsync}
              colorScheme="blue"
              leftIcon={<Icon as={Ionicons} name="logo-facebook" size="sm" />}
            >
              Continue with Facebook
            </AppButton>
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
                  const decodedToken = jwtDecode<any>(credential.identityToken!);
                  if (
                    !decodedToken.email ||
                    decodedToken.email?.includes("privaterelay.appleid.com")
                  ) {
                    NullEmailAlert();
                  }
                } catch (e: any) {
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
          {modalState === true && (
            <OTPInputModal
              userData={userData}
              state={modalState}
              revalidate={revalidate}
              changeValidation={setRevalidate}
              closeModal={() => setModalState(false)}
              next={async (dt) => {
                setModalState(false);
                await storeStringData("userToken", dt?.data?.activateAccount?.token);
                dispatch(
                  setUser({
                    user: {
                      ...dt?.data?.activateAccount?.user,
                      token: dt?.data?.activateAccount?.token,
                    },
                  })
                );
              }}
            />
          )}
          {isVisible && (
            <Modal animationType="slide" transparent visible={isVisible}>
              <SafeAreaView
                style={{
                  marginTop: "80%",
                  flex: 1,
                  backgroundColor: "white",
                  borderTopRightRadius: 100,
                  padding: "5%",
                  zIndex: 10,
                }}
              >
                <VStack>
                  <Heading
                    style={{
                      color: Colors.BLACK,
                      fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
                      fontSize: Typography.FONT_SIZE_24,
                      paddingRight: Spacing.SCALE_16,
                      paddingLeft: Spacing.SCALE_16,
                      letterSpacing: 2,
                    }}
                  >
                    Verify your email
                  </Heading>

                  <View>
                    <FormField
                      control={control}
                      name="email"
                      rules={{
                        required: true,
                      }}
                      label="Email"
                      placeholder="Email..."
                      autoCaps="none"
                      inputType="email"
                      msg={errors.email?.message}
                    />
                    <AppButton
                      style={{
                        backgroundColor: Colors.RUST,
                      }}
                      onPress={handleSubmit((val: { email: string }) => {
                        setIsVisible(false);
                        setLoading(true);
                        setUserData({
                          email: val.email,
                        });
                        verifyProviderEmail({
                          variables: {
                            email: val.email,
                          },
                        });
                      })}
                      isDisabled={!!errors.email?.message}
                      marginTop={8}
                      marginBottom={4}
                    >
                      Submit
                    </AppButton>
                  </View>
                </VStack>
              </SafeAreaView>
            </Modal>
          )}
        </VStack>
      </GradientLayout>
    </>
  );
};

export default Launch;
