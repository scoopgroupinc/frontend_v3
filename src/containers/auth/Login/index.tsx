import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import FormField from "../../../components/molecule/FormField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppButton } from "../../../components/atoms/AppButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@apollo/client";
import { LOG_IN_USER } from "../../../services/graphql/auth/mutations";
import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/features/user/userSlice";
import { storeStringData } from "../../../utils/storage";

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const [loginUserMutation, { data: loginData, loading: loginLoading }] =
    useMutation(LOG_IN_USER);

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

  const onForgotPasswordPress = () => {};
  const loginUser = (formData: any) => {
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
            user: res?.data?.login?.user,
          })
        );
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <AppActivityIndicator visible={loginLoading} />
      <GradientLayout>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View>
              <Text style={styles.title}>Sign In</Text>
            </View>

            <View>
              <FormField
                control={control}
                name="email"
                rules={{
                  required: true,
                }}
                label="Email"
                placeholder="Email..."
                autoCaps={"none"}
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
                autoCaps={"none"}
                inputType="password"
                msg={errors.password?.message}
              />
            </View>
          </View>

          <View style={styles.btnContainer}>
            <AppButton
              title={"Submit"}
              style={{
                backgroundColor: Colors.ICE_WHITE,
              }}
              onPress={handleSubmit(loginUser)}
            />

            <TouchableOpacity onPress={() => onForgotPasswordPress()}>
              <Text style={styles.link}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("CreateAccount")}
            >
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        {/* {modalState === true && (
          <OTPInputModal
            userData={userData}
            state={modalState}
            revalidate={revalidate}
            changeValidation={setRevalidate}
            closeModal={() => setModalState(false)}
            next={() => {
              setModalState(false);
            }}
          />
        )} */}
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
