/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heading, VStack } from "native-base";
import { Picker } from "react-native-wheel-pick";
import { styles } from "./styles";
import { useAppSelector } from "../../../store/hooks";
import { SAVE_USER_HEIGHT } from "../../../services/graphql/onboarding/mutations";
import { screenName } from "../../../utils/constants";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import { useSegment } from "../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";
import { heights } from "../../../utils/constants/heights";

export const HeightScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;

  const [height, setHeight] = useState("");

  const [saveUserProfile, { loading }] = useMutation(SAVE_USER_HEIGHT);

  const analytics = useSegment();
  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.onBoardHeight,
      screenType: screenClass.onBoarding,
    });
  }, []);

  const saveUserHeight = async () => {
    try {
      const data = {
        userId,
        height,
      };
      analytics.identifyEvent({
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
      analytics.trackEvent({
        eventName: `${eventNames.nextOnBoardNotificationButton} - Error`,
        params: { ...data, screenClass: screenClass.onBoarding, error },
      });
      Alert.alert("Error", error.message || "Something went wrong!");
    }
  };

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
            <Picker
              textColor="black"
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                marginTop: 20,
              }}
              selectedValue={height}
              pickerData={heights}
              onValueChange={setHeight}
            />
          </View>
          <AppButton isDisabled={!height} onPress={saveUserHeight}>
            Next
          </AppButton>
        </View>
      </GradientLayout>
    </>
  );
};
