import React, { useState } from "react";
import { View } from "react-native";
import { Heading, VStack } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import FormField from "../../../components/molecule/FormField";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { CREATE_USER } from "../../../services/graphql/auth/mutations";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { Colors } from "../../../utils";
import { screenName } from "../../../utils/constants";
import { OTPInputModal } from "../../../components/templates/OTPInputModal";
import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/features/user/userSlice";
import { storeStringData } from "../../../utils/storage";
import { logEvent } from "../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";

const CreateAccount = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [userData, setUserData] = useState<any>();
  const [modalState, setModalState] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useOnScreenView({screenName:analyticScreenNames.signUp,
    screenType:screenClass.auth});

  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(4, " Password must be at least 4 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .min(4, " Password must be at least 4 characters")
      .required("Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [registerUserMutation, { data: registerData, loading: registerLoading }] =
    useMutation(CREATE_USER);

  const createUserAccount = (formData: any) => {
    setUserData({ ...userData, ...formData });

    logEvent({
      eventName: eventNames.submitSignUpButtonClick,
      params: { email: userData.email },
    });
    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };

      registerUserMutation({
        variables: { createUserInput: data },
      }).then((response) => {
        if (response && response?.data?.createUser) {
          setModalState(true);
        }
        logEvent({
          eventName: eventNames.submitSignUpButtonResponse,
          params: { success: response?.data?.createUser },
        });
      });
    } catch (err) {
      logEvent({
        eventName: eventNames.submitSignUpButtonResponse,
        params: { error: err.message },
      });
    }
  };

  return (
    <>
      <AppActivityIndicator visible={registerLoading} />
      <GradientLayout>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, marginBottom: "3%" }}>
            <View>
              <Heading>Sign Up</Heading>
            </View>
            <FormField
              control={control}
              name="email"
              rules={{
                required: true,
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email",
                },
              }}
              label="Email"
              placeholder="Email..."
              autoCaps="none"
              msg={errors?.email?.message}
            />
            <FormField
              control={control}
              name="password"
              rules={{
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              label="Password"
              placeholder="Password..."
              autoCaps="none"
              inputType="password"
              msg={errors?.password?.message}
            />

            <FormField
              rules={{
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm Password..."
              autoCaps="none"
              inputType="password"
              msg={errors?.confirmPassword?.message}
            />
            <VStack style={styles.btnContainer} space={4}>
              <AppButton
                bgColor={Colors.ICE_WHITE}
                isDisabled={!!(errors.email || errors.password || errors.confirmPassword)}
                onPress={handleSubmit(createUserAccount)}
              >
                Submit
              </AppButton>
              <AppButton variant="ghost" onPress={() => navigation.navigate(screenName.LAUNCH)}>
                Sign In
              </AppButton>
            </VStack>
          </View>
        </KeyboardAwareScrollView>
        {modalState === true && (
          <OTPInputModal
            userData={userData}
            state={modalState}
            closeModal={() => setModalState(false)}
            next={async (dt) => {
              setModalState(false);
              await storeStringData("userToken", dt?.data?.activateAccount?.token);
              dispatch(
                setUser({
                  user: JSON.parse(dt?.data?.activateAccount?.user),
                })
              );
            }}
          />
        )}
      </GradientLayout>
    </>
  );
};

export default CreateAccount;
