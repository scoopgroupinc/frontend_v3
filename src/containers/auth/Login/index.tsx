import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@apollo/client";
import { AppButton } from "../../../components/atoms/AppButton";
import FormField from "../../../components/molecule/FormField";
import { styles } from "./styles";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { LOG_IN_USER } from "../../../services/graphql/auth/mutations";
import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/features/user/userSlice";
import { storeStringData } from "../../../utils/storage";
import { OTPInputModal } from "../../../components/templates/OTPInputModal";
import { Colors } from "../../../utils";
import { screenName } from "../../../utils/constants";
import { Heading, VStack } from "native-base";

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [userData, setUserData] = useState<any>();
  const [modalState, setModalState] = useState<boolean>(false);
  const [revalidate, setRevalidate] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [details, setDetails] = useState<any>();

  const dispatch = useAppDispatch();

  const [loginUserMutation, { data: loginData, loading: loginLoading }] = useMutation(LOG_IN_USER);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required."),
    password: yup
      .string()
      .min(4, "Password must be at least 4 characters.")
      .required("Password is required."),
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

  const loginUser = (formData: any) => {
    setUserData(formData);
    loginUserMutation({
      variables: {
        LoginUserInput: {
          email: formData.email,
          password: formData.password,
        },
      },
    })
      .then(async (res) => {
        await storeStringData("userToken", res?.data?.login?.token);
        dispatch(
          setUser({
            user: {
              ...res?.data?.login?.user,
              token: res?.data?.login?.token,
            },
          })
        );
      })
      .catch((err) => {
        if (err.message === "Kindly activate your account") {
          setModalState(true);
        }
        // logEvent({
        //   eventName: eventNames.submitSignInButtonResponse,
        //   params: { error: err.message },
        // });
        // loading = false;
      });
  };

  return (
    <>
      <AppActivityIndicator visible={loginLoading} />
      <GradientLayout>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View>
            <VStack>
              <Heading>Sign In</Heading>

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
                <FormField
                  control={control}
                  name="password"
                  rules={{
                    required: true,
                  }}
                  label="Password"
                  placeholder="Password..."
                  autoCaps="none"
                  inputType="password"
                  msg={errors.password?.message}
                />
              </View>
            </VStack>
          </View>

          <VStack>
            <AppButton
              onPress={handleSubmit(loginUser)}
              isDisabled={!!(errors.email?.message || errors.password?.message)}
              marginTop={8}
              marginBottom={4}
            >
              Submit
            </AppButton>

            <AppButton variant="ghost" onPress={() => navigation.navigate(screenName.FORGOT_PASSWORD)}>
              Forgot Password
            </AppButton>

            <AppButton variant="ghost" onPress={() => navigation.navigate(screenName.REGISTER)}>
              Sign Up
            </AppButton>
          </VStack>
        </KeyboardAwareScrollView>
        {modalState === true && (
          <OTPInputModal
            userData={userData}
            state={modalState}
            revalidate={revalidate}
            changeValidation={setRevalidate}
            closeModal={() => setModalState(false)}
            next={(dt) => {
              setModalState(false);
              dispatch(
                setUser({
                  user: JSON.parse(dt?.data?.activateAccount?.user),
                })
              );
            }}
          />
        )}
        {/* {showModal && (
          <UpdateModal
            onClose={() => setShowModal(false)}
            state={showModal}
            details={details}
            updateAndroid={updateAndroid}
            updateIOS={updateIOS}
            forceUpdateAndroid={forceUpdateAndroid}
            forceUpdateIOS={forceUpdateIOS}
          />
        )} */}
      </GradientLayout>
    </>
  );
};

export default LoginScreen;
