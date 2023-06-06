import React, { useState } from "react";
import { View, Text } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Slider } from "@miblanchard/react-native-slider";
import { styles } from "./styles";
import { useAppSelector } from "../../../store/hooks";
import { SAVE_USER_HEIGHT } from "../../../services/graphql/onboarding/mutations";
import { screenName } from "../../../utils/constants";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
// TODO: replace with better slider

export const HeightScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;

  const [heightFt, setHeightFt] = useState(5.1);
  const [heightCm, setHeightCm] = useState(5.1);

  const [saveUserProfile, { loading }] = useMutation(SAVE_USER_HEIGHT);
  const saveUserHeight = async () => {
    try {
      const data = {
        userId,
        height: `${heightFt}'${heightCm}"`,
      };
      // logEvent({
      //   eventName: eventNames.nextOnBoardNotificationButton,
      //   params: {...data, screenClass: screenClass.onBoarding},
      // })
      await saveUserProfile({
        variables: {
          UserProfileInput: data,
        },
      })
        .then((res) => {
          navigation.navigate(screenName.PHOTOS);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   onScreenView({
  //     screenName: screenNames.onBoardHeight,
  //     screenType: screenClass.onBoarding,
  //   })
  // }, [])

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <GradientLayout>
        <View style={styles.container}>
          <ProgressBar progress={0.5} color="#0E0E2C" />
          <View style={styles.sliderContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.caption}>How tall are you?</Text>
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
                {Array.isArray(heightCm) ? heightCm.join(" - ") : heightCm} "
              </Text>
            </View>
            <Slider
              value={heightCm}
              minimumValue={0}
              maximumValue={11}
              step={1}
              animateTransitions
              minimumTrackTintColor="#d14ba6"
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
              onValueChange={(val: any) => {
                val = Array.isArray(val) ? val[0] : val;
                setHeightCm(val);
              }}
            />
          </View>
          <AppButton
            title="Next"
            disabled={!!(heightFt && heightCm === 5.1)}
            onPress={saveUserHeight}
          />
        </View>
      </GradientLayout>
    </>
  );
}
