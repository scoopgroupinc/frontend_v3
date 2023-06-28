/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import { Heading, VStack } from "native-base";
import { useAppSelector } from "../../../store/hooks";
import { styles } from "./styles";
import { SAVE_USER_BIRTHDAY } from "../../../services/graphql/onboarding/mutations";
import { screenName } from "../../../utils/constants";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import { DateSpinner } from "../../../components/atoms/DateSpinner";
import { logEvent, onScreenView } from "../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";
import { useOnScreenView } from "../../../hooks/useOnScreenView";

export const OnboardBirthdayScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;

  const [age, setAge] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [, setModalState] = useState<boolean>(false);
  const close = () => {
    setModalState(false);
  };

  useOnScreenView({screenName:analyticScreenNames.onBoardBirthday,
    screenType:screenClass.onBoarding});

  useEffect(() => {
    if (date !== null) {
      const age = moment().diff(date, "years");
      setAge(age);
    }
  }, [date]);

  const [saveUserProfile, { loading }] = useMutation(SAVE_USER_BIRTHDAY);
  const saveUserBirthday = async () => {
    try {
      const data = {
        userId,
        birthday: moment(date).format("YYYY-MM-DD"),
      };
      logEvent({
        eventName: eventNames.confirmOnBoardBirthdayButton,
        params: { ...data, screenClass: screenClass.onBoarding },
      });
      await saveUserProfile({
        variables: {
          UserProfileInput: data,
        },
      }).then(async () => {
        setModalState(false);
        navigation.navigate(screenName.HEIGHT);
      });
    } catch (err) {
      Alert.alert("Error", err.message || "Something went wrong!");
    }
  };

  const DateAlert = () => {
    logEvent({
      eventName: eventNames.submitOnBoardBirthdayButton,
      params: { birthday: moment(date).format("YYYY-MM-DD") },
    });
    Alert.alert(
      "Please confirm your info",
      `Your birthday is ${new Date(date).toDateString()} and you are ${age} years old`,
      [
        {
          text: "Edit birthday",
          onPress: close,
          style: "cancel",
        },
        { text: "Yes", onPress: saveUserBirthday },
      ]
    );
  };

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <GradientLayout>
        <View style={styles.container}>
          <ProgressBar progress={0.4} color="#0E0E2C" />
          <VStack space={4} style={styles.textContainer}>
            <Heading>What&apos;s your date of birth?</Heading>
            <Text style={styles.dobSubTitle}>This can&apos;t be changed later</Text>
          </VStack>
          <View style={styles.dateContainer}>
            <View>
              <Text style={styles.date}>{moment(date).format("YYYY-MM-DD")}</Text>
              <DateSpinner getAge={setAge} getDate={setDate} />
            </View>
            <AppButton
              isDisabled={
                moment(date).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD")
              }
              onPress={() => DateAlert()}
            >
              Next
            </AppButton>
          </View>
        </View>
      </GradientLayout>
    </>
  );
};
