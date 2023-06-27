import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Heading, VStack } from "native-base";
import { FORGOT_PASSWORD } from "../../../services/graphql/auth/mutations";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import FormField from "../../../components/molecule/FormField";
import { AppButton } from "../../../components/atoms/AppButton";
import { OTPInputModal } from "../../../components/templates/OTPInputModal";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { screenName } from "../../../utils/constants";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";
import { logEvent, onScreenView } from "../../../analytics";
import { useOnScreenView } from "../../../hooks/useOnScreenView";

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

  useOnScreenView({screenName:analyticScreenNames.forgetPassword,
    screenType:screenClass.auth});

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
        <VStack space={24}>
          <Heading>Forgot Password</Heading>
          <View style={{ marginBottom: 24 }}>
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
        </VStack>
        <VStack space={4}>
          <AppButton
            isDisabled={!!(errors.email?.message || errors.password?.message)}
            onPress={handleSubmit(forgotPasswordEvent)}
          >
            Forgot Password
          </AppButton>
          <AppButton variant="ghost" onPress={() => navigation.navigate(screenName.LOGIN)}>
            Sign In
          </AppButton>
        </VStack>
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
