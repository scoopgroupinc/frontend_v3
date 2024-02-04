/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heading, VStack } from "native-base";
import { styles } from "./styles";
import { SelectButtons } from "../../../components/layouts/SelectButtons";
import { AppButton } from "../../../components/atoms/AppButton";
import { useAppSelector } from "../../../store/hooks";
import { SAVE_GENDER_PREFENCE } from "../../../services/graphql/onboarding/mutations";
import { screenName } from "../../../utils/constants";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { useSegment } from "../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";

export const DateWhoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;

  const [mate, setMate] = useState<string>("");
  const analytics = useSegment();
  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.onBoardGenderPreference,
      screenType: screenClass.onBoarding,
    });
  }, []);
  
  const [saveUserProfile, { loading }] = useMutation(SAVE_GENDER_PREFENCE);
  const saveGenderPreference = async () => {
    try {
      const data = {
        userId,
        gender: mate,
      };
      analytics.identifyEvent({
        eventName: eventNames.submitOnBoardGenderPreferenceButton,
        params: { ...data, screenClass: screenClass.onBoarding },
      });
      await saveUserProfile({
        variables: {
          userPreferenceInput: data,
        },
      }).then(async () => {
        navigation.navigate(screenName.LOCATION);
      });
    } catch (err) {
      analytics.trackEvent({
        eventName: `${eventNames.submitOnBoardGenderPreferenceButton} - Error`,
        params: { ...data, screenClass: screenClass.onBoarding, error: err },
      });
      Alert.alert("Error", err.message || "Something went wrong!");
    }
  };

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <GradientLayout>
        <View style={styles.container}>
          <ProgressBar progress={0.3} color="#0E0E2C" />
          <VStack space={24} style={styles.genderContainer}>
            <Heading>Which gender do you want to be matched with?</Heading>
            <View style={styles.genderTypesContainer}>
              <SelectButtons titles={["male", "female", "bisexual"]} funk={setMate} />
            </View>
          </VStack>
          <AppButton isDisabled={mate === ""} onPress={saveGenderPreference}>
            Next
          </AppButton>
        </View>
      </GradientLayout>
    </>
  );
};
