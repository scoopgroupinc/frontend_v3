import React, { useState } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Heading, VStack } from "native-base";
import { RESET_PASSWORD } from "../../../services/graphql/auth/mutations";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import styles from "./style";
import { screenName } from "../../../utils/constants";
import FormField from "../../../components/molecule/FormField";
import { AppButton } from "../../../components/atoms/AppButton";
import { AppIconButton } from "../../../components/layouts/AppIconButton";

const ResetPassword = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [loading, setLoading] = useState<boolean>(false);

  const email = route?.params?.email;

  const [reset] = useMutation(RESET_PASSWORD);

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(4, " Password must be at least 4 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .min(4, " Password must be at least 4 characters")
      .required("Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  //   useEffect(() => {
  //     onScreenView({
  //       screenName: screenNames.resetPassword,
  //       screenType: screenClass.auth,
  //     });
  //   }, []);

  const resetPassword = async (formData: any) => {
    setLoading(true);
    try {
      reset({
        variables: {
          email,
          password: formData.password,
        },
      }).then(() => {
        setLoading(false);
        Alert.alert("Password reset successfully!");
        return navigation.navigate(screenName.LOGIN);
      });
    } catch (err: any) {
      setLoading(false);
      Alert.alert(err.message);
    }
  };

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <GradientLayout>
        <View>
          <VStack space={24}>
            <Heading>Reset Password</Heading>
          </VStack>
          <View>
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
          </View>
        </View>
        <VStack space={4} style={styles.btnContainer}>
          <AppButton
            onPress={handleSubmit(resetPassword)}
            isDisabled={!!(errors.password || errors.confirmPassword || loading)}
          >
            Reset Password
          </AppButton>
          <AppButton variant="ghost"
            onPress={() => navigation.navigate(screenName.LOGIN)}>
            Cancel
          </AppButton>
        </VStack>
      </GradientLayout>
    </>
  );
};

export default ResetPassword;
