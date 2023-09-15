import React from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Heading, VStack } from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { AppButton } from "../../../components/atoms/AppButton";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { useAppDispatch } from "../../../store/hooks";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import FormField from "../../../components/molecule/FormField";
import { PROVIDER_LOGIN } from "../../../services/graphql/auth/mutations";
import { storeObjectData, storeStringData } from "../../../utils/storage";
import { setUser } from "../../../store/features/user/userSlice";

const AppleEmail = ({ route }: any) => {
  const dispatch = useAppDispatch();

  useOnScreenView({ screenName: analyticScreenNames.signIn, screenType: screenClass.auth });

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required."),
  });

  const { credential } = route.params;

  const [loginWithProvider] = useMutation(PROVIDER_LOGIN);

  const loginUser = async (formData: any) => {
    const { email } = formData;
    const cred = JSON.parse(credential);

    try {
      const loginResponse = await loginWithProvider({
        variables: {
          authProviderInput: {
            email,
            id: cred?.user,
            provider: cred?.provider,
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
          providerUserId: cred?.user,
          provider: cred?.provider,
        }).then(() => {
          // Note once set, user will be redirected and considered logged in
          dispatch(
            setUser({
              user: {
                ...user,
                token,
                providerUserId: cred?.user,
                provider: cred?.provider,
              },
            })
          );
        });
      }
    } catch (err: any) {
      Alert.alert("Login Error", err.message);
    }
  };

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

  return (
    <>
      <AppActivityIndicator visible={false} />
      <GradientLayout>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Heading style={{ textAlign: "center" }}>Apple Email</Heading>
            <Text
              style={{
                color: "white",
                paddingVertical: 10,
              }}
            >
              Scoop needs to use your email address to complete the registration process.
            </Text>
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
            </View>
          </View>

          <VStack>
            <AppButton
              isDisabled={errors.email?.message !== undefined}
              onPress={handleSubmit(loginUser)}
              marginTop={8}
              marginBottom={4}
            >
              Submit
            </AppButton>
          </VStack>
        </KeyboardAwareScrollView>
      </GradientLayout>
    </>
  );
};

export default AppleEmail;
