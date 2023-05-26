import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormField from "../../../components/molecule/FormField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../services/graphql/auth/mutations";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { Colors } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { screenName } from "../../../utils/constants";

const CreateAccount = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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

  const [
    registerUserMutation,
    { data: registerData, loading: registerLoading },
  ] = useMutation(CREATE_USER);

  const createUserAccount = () => {};

  return (
    <>
      <AppActivityIndicator visible={registerLoading} />
      <GradientLayout>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, marginBottom: "3%" }}>
            <View>
              <Text style={styles.title}>Sign Up</Text>
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
              autoCaps={"none"}
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
              autoCaps={"none"}
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
              autoCaps={"none"}
              inputType="password"
              msg={errors?.confirmPassword?.message}
            />
            <View style={styles.btnContainer}>
              <AppButton
                style={{
                  backgroundColor: Colors.ICE_WHITE,
                }}
                title={"Submit"}
                onPress={handleSubmit(createUserAccount)}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate(screenName.LOGIN)}
              >
                <Text style={styles.link}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* {modalState === true && (
          <OTPInputModal
            userData={userData}
            state={modalState}
            closeModal={() => setModalState(false)}
            next={() => {
              setModalState(false);
              navigation.navigate(MAIN_NAVIGATION.ONBOARDING_HANDLER);
            }}
          />
        )} */}
      </GradientLayout>
    </>
  );
};

export default CreateAccount;
