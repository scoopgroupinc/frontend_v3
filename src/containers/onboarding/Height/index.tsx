/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Slider } from "@miblanchard/react-native-slider";
import { Heading, VStack } from "native-base";
import { styles } from "./styles";
import { useAppSelector } from "../../../store/hooks";
import { SAVE_USER_HEIGHT } from "../../../services/graphql/onboarding/mutations";
import { screenName } from "../../../utils/constants";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import { logEvent, onScreenView } from "../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";

// TODO: replace with better slider

export const HeightScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;

  const [heightFt, setHeightFt] = useState(5);
  const [heightInches, setHeightInches] = useState(5.1);

  const [saveUserProfile, { loading }] = useMutation(SAVE_USER_HEIGHT);
  const saveUserHeight = async () => {
    try {
      const data = {
        userId,
        height: `${heightFt}'${heightInches}"`,
      };
      logEvent({
        eventName: eventNames.nextOnBoardNotificationButton,
        params: { ...data, screenClass: screenClass.onBoarding },
      });
      await saveUserProfile({
        variables: {
          UserProfileInput: data,
        },
      }).then(() => {
        navigation.navigate(screenName.PHOTOS);
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    onScreenView({
      screenName: analyticScreenNames.onBoardHeight,
      screenType: screenClass.onBoarding,
    });
  }, []);

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <GradientLayout>
        <View style={styles.container}>
          <ProgressBar progress={0.5} color="#0E0E2C" />
          <View style={styles.sliderContainer}>
            <VStack space={24}>
              <Heading>How tall are you?</Heading>
            </VStack>
            <View style={styles.titleContainer}>
              <Text style={styles.value}>
                {Array.isArray(heightFt) ? heightFt.join(" - ") : heightFt} ft
              </Text>
            </View>
            <Slider
              value={heightFt}
              minimumValue={3}
              maximumValue={7}
              step={1}
              animateTransitions
              minimumTrackTintColor="#d14ba6"
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
              onValueChange={(val: any) => {
                val = Array.isArray(val) ? val[0] : val;
                setHeightFt(val);
              }}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.value}>
                {Array.isArray(heightInches) ? heightInches.join(" - ") : heightInches}
              </Text>
            </View>
            <Slider
              value={heightInches}
              minimumValue={0}
              maximumValue={11}
              step={1}
              animateTransitions
              minimumTrackTintColor="#d14ba6"
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
              onValueChange={(val: any) => {
                val = Array.isArray(val) ? val[0] : val;
                setHeightInches(val);
              }}
            />
          </View>
          <AppButton isDisabled={heightInches === 5.1} onPress={saveUserHeight}>
            Next
          </AppButton>
        </View>
      </GradientLayout>
    </>
  );
};
