/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { styles } from "./styles";
import { useAppDispatch } from "../../../store/hooks";
import {
  ACTIVATE_ACCOUNT,
  FORGOT_PASSWORD,
  RESEND_ACTIVATION_CODE,
  VERIFY_PASSWORD_CHANGE,
} from "../../../services/graphql/auth/mutations";
import { Colors } from "../../../utils";
import { AppButton } from "../../atoms/AppButton";
import { SlideUpModal } from "../../layouts/SlideUpModal";
import { storeStringData } from "../../../utils/storage";
// TODO: replace with a more manged component that doesnt use deprecated ViewPropTypes, breaks web view
// when removed make sure to delete src/types/index.d.tx declare of react-native-smooth-pincode-input
import { setUser } from "../../../store/features/user/userSlice";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";
import { logEvent, onScreenView } from "../../../analytics";

type UserData = {
  email: string;
  password?: string;
  confirmPassword?: string;
};

interface ModalType {
  state: boolean;
  userData: UserData;
  closeModal: () => void;
  next: (data: any) => void;
  text?: string;
  revalidate?: boolean;
  changeValidation?: Function;
  forgotPass?: boolean;
}

export const OTPInputModal = ({
  state,
  closeModal,
  next,
  userData,
  revalidate,
  changeValidation,
  forgotPass,
}: ModalType) => {
  const [timer, setTimer] = useState<number>(revalidate ? 0 : 60);
  const [showResend, setShowResend] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const [resendActivationCode] = useMutation(forgotPass ? FORGOT_PASSWORD : RESEND_ACTIVATION_CODE);
  const [activateAccount] = useMutation(ACTIVATE_ACCOUNT);
  const [verifyRstPassCode] = useMutation(VERIFY_PASSWORD_CHANGE);

  useEffect(() => {
    onScreenView({
      screenName: forgotPass
        ? analyticScreenNames.forgotPasswordOTP
        : analyticScreenNames.signUpOTP,
      screenType: screenClass.auth,
    });
    if (timer === 0) {
      setShowResend(true);
    }
    if (timer === 0) return;

    const intervalId = setInterval(() => {
      setTimer((value) => value - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleResend = () => {
    if (changeValidation) changeValidation(false);
    setShowResend(false);
    logEvent({
      eventName: eventNames.submitResendOtpButton,
      params: {},
    });
    resendActivationCode({
      variables: { email: userData.email.toLowerCase() },
    })
      .then((response) => {
        if ((response && response?.data?.resendActivationCode) || response?.data?.forgotPassword) {
          Alert.alert("Verification OTP was resent");
          setTimer(60);
        }
      })
      .catch((err) => {});
  };

  const verifyRstPassOtp = async () => {
    logEvent({
      eventName: eventNames.submitOtpButton,
      params: { email: userData.email },
    });
    try {
      await verifyRstPassCode({
        variables: {
          email: userData.email,
          code: Number(code),
        },
      })
        .then(async (res) => {
          if (res?.data?.verifyPasswordResetCode?.message === "Code verified") {
            await storeStringData("userToken", res?.data?.verifyPasswordResetCode?.token);
            return next();
          }
        })
        .catch(() => {});
    } catch (e) {
      /**  */
    }
  };

  const verifyOtp = async () => {
    logEvent({
      eventName: eventNames.submitOtpButton,
      params: { email: userData.email },
    });

    try {
      await activateAccount({
        variables: {
          email: userData.email,
          code: Number(code),
        },
      }).then(async (res) => {
        if (res?.data) {
          return next(res);
        }
      });
    } catch (err) {
      /**  */
    }
  };

  return (
    <SlideUpModal state={state} close={closeModal}>
      <KeyboardAwareScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.headerText}>Check your email for a verification code.</Text>

            <View style={styles.container}>
              <SmoothPinCodeInput
                cellStyle={{
                  borderWidth: 2,
                  borderColor: Colors.DARK_GRAY_BLUE,
                }}
                cellStyleFocused={{
                  borderColor: Colors.DARK_GRAY_BLUE,
                }}
                textStyle={{
                  fontSize: 24,
                  color: Colors.DARK_GRAY_BLUE,
                  fontWeight: "500",
                }}
                textStyleFocused={{
                  color: Colors.DARK_GRAY_BLUE,
                }}
                codeLength={4}
                keyboardType="numeric"
                returnkey="done"
                placeholder=""
                value={code}
                onTextChange={(code: any) => setCode(code)}
              />
              <Text style={styles.text}>
                {revalidate
                  ? "A code was previously sent to your email, if it has expired request a new one "
                  : `We’ve sent a code to ${userData.email}. You can send another in ${timer} seconds.`}
              </Text>
              <AppButton
                colorScheme="teal"
                isDisabled={!showResend}
                onPress={handleResend}
                style={styles.buttonResend}
              >
                Resend code
              </AppButton>
            </View>
          </View>

          <AppButton
            colorScheme="orange"
            isDisabled={code === ""}
            onPress={forgotPass ? verifyRstPassOtp : verifyOtp}
          >
            Verify
          </AppButton>
        </View>
      </KeyboardAwareScrollView>
    </SlideUpModal>
  );
};
