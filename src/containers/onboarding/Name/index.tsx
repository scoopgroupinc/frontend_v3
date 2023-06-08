import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SAVE_USER_NAME } from "../../../services/graphql/onboarding/mutations";
import { screenName } from "../../../utils/constants";
import { initialData } from "./utils/util";
import { styles } from "./styles";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import FieldComponent from "../../../components/molecule/FormField";
import { AppButton } from "../../../components/atoms/AppButton";
import { Colors } from "../../../utils";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { updateUser } from "../../../store/features/user/userSlice";
import { Heading, VStack } from "native-base";

export type UserData = {
  firstname: string;
  lastname: string;
};

export const OnboardName = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const email = user?.email;

  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    firstname: yup
      .string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    lastname: yup
      .string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: firstName,
      lastname: lastName,
    },
  });

  const [userData, setUserData] = useState<UserData>(initialData);

  // const screenProgress = COMPLETE_SCREEN.find(
  //   (item) => item.name === ONBOARD_NAVIGATION.NAME
  // )?.progress;

  const [updateUserNames, { loading }] = useMutation(SAVE_USER_NAME);
  const saveUserNames = async (formData: any) => {
    // logEvent({
    //   eventName: eventNames.submitOnBoardNameButton,
    //   params: {
    //     screenName: screenNames.onBoardName,
    //     screenType: screenClass.onBoarding,
    //     ...formData,
    //   },
    // });
    try {
      const data = {
        firstName: formData.firstname,
        lastName: formData.lastname,
        email,
      };
      await updateUserNames({
        variables: {
          UpdateUserInput: data,
        },
      })
        .then(async (res) => {
          if (res?.data?.updateUser) {
            dispatch(
              updateUser({
                value: {
                  firstName: res?.data?.updateUser?.firstName,
                  lastName: res?.data?.updateUser?.lastName,
                },
              })
            );
            navigation.navigate(screenName.GENDER);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   onScreenView({
  //     screenName: screenNames.onBoardName,
  //     screenType: screenClass.onBoarding,
  //   });
  // }, []);

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <GradientLayout>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <ProgressBar style={{ marginTop: "3%" }} progress={0.1} color="#0E0E2C" />
            <VStack space={8}>
              <Heading>What's your name?</Heading>
              <Text style={styles.subTitle}>This can't be changed later</Text>
            </VStack>
            <View style={styles.fieldContainer}>
              <FieldComponent
                control={control}
                name="firstname"
                label="First Name"
                placeholder="First Name..."
                autoCaps="none"
                msg={errors.firstname?.message}
              />
              <FieldComponent
                control={control}
                name="lastname"
                label="Last Name"
                placeholder="Last Name..."
                autoCaps="none"
                msg={errors.lastname?.message}
              />
            </View>
            <AppButton
              isDisabled={!!(errors.firstname || errors.lastname)}
              onPress={handleSubmit(saveUserNames)}
            >
              Next
            </AppButton>
          </View>
        </KeyboardAwareScrollView>
      </GradientLayout>
    </>
  );
};
