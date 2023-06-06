import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { styles } from "./styles";
import { ProgressBar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "../../../store/hooks";
import moment from "moment";
import { SAVE_USER_BIRTHDAY } from "../../../services/graphql/onboarding/mutations";
import { screenName } from "../../../utils/constants";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import { DateSpinner } from "../../../components/atoms/DateSpinner";

export const OnboardBirthdayScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;

  const [age, setAge] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [modalState, setModalState] = useState<boolean>(false);
  const close = () => {
    setModalState(false);
  };

  useEffect(() => {
    if (date !== null) {
      let age = moment().diff(date, "years");
      setAge(age);
    }
    // onScreenView({
    //   screenName: screenNames.onBoardBirthday,
    //   screenType: screenClass.onBoarding,
    // });
  }, [date]);

  const [saveUserProfile, { loading }] = useMutation(SAVE_USER_BIRTHDAY);
  const saveUserBirthday = async () => {
    try {
      let data = {
        userId,
        birthday: moment(date).format("YYYY-MM-DD"),
      };
      // logEvent({
      //   eventName: eventNames.confirmOnBoardBirthdayButton,
      //   params: { ...data, screenClass: screenClass.onBoarding },
      // });
      await saveUserProfile({
        variables: {
          UserProfileInput: data,
        },
      })
        .then(async (res) => {
          setModalState(false);
          navigation.navigate(screenName.HEIGHT);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const DateAlert = () => {
    // logEvent({
    //   eventName: eventNames.submitOnBoardBirthdayButton,
    //   params: { birthday: moment(date).format("YYYY-MM-DD") },
    // });
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
          <ProgressBar progress={0.4} color={"#0E0E2C"} />
          <View style={styles.textContainer}>
            <Text style={styles.dobTitle}>What's your date of birth?</Text>
            <Text style={styles.dobSubTitle}>This can't be changed later</Text>
          </View>
          <View style={styles.dateContainer}>
            <View>
              <Text style={styles.date}>{moment(date).format("YYYY-MM-DD")}</Text>
              <DateSpinner getAge={setAge} getDate={setDate} />
            </View>
            <AppButton
              title={"Next"}
              disabled={
                moment(date).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD")
                  ? true
                  : false
              }
              onPress={() => DateAlert()}
            />
          </View>
        </View>
      </GradientLayout>
    </>
  );
};
