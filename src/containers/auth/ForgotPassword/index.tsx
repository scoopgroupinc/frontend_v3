import { View, Text, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { FORGOT_PASSWORD } from "../../../services/graphql/auth/mutations";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import styles from "./style";
import FormField from "../../../components/molecule/FormField";
import { AppButton } from "../../../components/atoms/AppButton";
import { Colors } from "../../../utils";
import { OTPInputModal } from "../../../components/templates/OTPInputModal";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { screenName } from "../../../utils/constants";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";
import { logEvent, onScreenView } from "../../../analytics";

const ForgotPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [modalState, setModalState] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [verify] = useMutation(FORGOT_PASSWORD);

  useEffect(() => {
    onScreenView({
      screenName: analyticScreenNames.forgetPassword,
      screenType: screenClass.auth,
    });
  }, []);
  const forgotPasswordEvent = (formData: any) => {
    setLoading(true);
    setUserEmail(formData.email);
    try {
      logEvent({
        eventName: eventNames.submitOtpButton,
        params: {},
      });
      verify({
        variables: {
          email: formData.email,
        },
      })
        .then((response) => {
          setLoading(false);
          Alert.alert(response?.data?.forgotPassword);
          setModalState(true);
        })
        .catch((e) => {
          console.log("error", e);
        });
    } catch (e) {
      /* empty block */
    }
  };

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <GradientLayout>
        <View>
          <View>
            <Text style={styles.title}>Forgot Password</Text>
          </View>
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
        </View>
        <View style={styles.btnContainer}>
          <AppButton
            title="Forgot Password"
            txtColor={Colors.BLACK}
            disabled={!!(errors.email?.message || errors.password?.message)}
            bgColor={Colors.ICE_WHITE}
            onPress={handleSubmit(forgotPasswordEvent)}
          />

          <Pressable onPress={() => navigation.navigate(screenName.LOGIN)}>
            <Text style={styles.link}>Sign In</Text>
          </Pressable>
        </View>
        {modalState === true && (
          <OTPInputModal
            userData={{
              email: userEmail,
            }}
            forgotPass
            state={modalState}
            closeModal={() => setModalState(false)}
            next={() => {
              setModalState(false);
              navigation.navigate(screenName.RESET_PASSWORD, {
                email: userEmail,
              });
            }}
          />
        )}
      </GradientLayout>
    </>
  );
};

export default ForgotPassword;
