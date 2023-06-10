import React, { useEffect, useState } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { RESET_PASSWORD } from "../../../services/graphql/auth/mutations";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import styles from "./style";
import { screenName } from "../../../utils/constants";
import FormField from "../../../components/molecule/FormField";
import { AppButton } from "../../../components/atoms/AppButton";
import { onScreenView } from "../../../analytics";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";

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

  useEffect(() => {
    onScreenView({
      screenName: analyticScreenNames.resetPassword,
      screenType: screenClass.auth,
    });
  }, []);

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
          <View>
            <Text style={styles.title}>Reset Password</Text>
          </View>
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
        <View style={styles.btnContainer}>
          <AppButton
            title="Reset Password"
            onPress={handleSubmit(resetPassword)}
            txtColor={Colors.BLACK}
            disabled={!!(errors.password || errors.confirmPassword || loading)}
            bgColor={Colors.ICE_WHITE}
          />

          <Pressable onPress={() => navigation.navigate(screenName.LOGIN)}>
            <Text style={styles.link}>Cancel</Text>
          </Pressable>
        </View>
      </GradientLayout>
    </>
  );
};

export default ResetPassword;
