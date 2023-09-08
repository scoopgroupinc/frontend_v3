import React, { useState } from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heading, VStack } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AppButton } from "../../../components/atoms/AppButton";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { useAppDispatch } from "../../../store/hooks";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import FormField from "../../../components/molecule/FormField";

const AppleEmail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  useOnScreenView({ screenName: analyticScreenNames.signIn, screenType: screenClass.auth });

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required."),
  });

  const loginUser = (formData: any) => {};

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
