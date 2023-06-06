import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { ProgressBar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SelectButtons } from "../../../components/layouts/SelectButtons";
import { AppButton } from "../../../components/atoms/AppButton";
import { useAppSelector } from "../../../store/hooks";
import { SAVE_GENDER_PREFENCE } from "../../../services/graphql/onboarding/mutations";
import { screenName } from "../../../utils/constants";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { Colors } from "../../../utils";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";

export const DateWhoScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;

  const [mate, setMate] = useState<string>("");

  const [saveUserProfile, { loading }] = useMutation(SAVE_GENDER_PREFENCE);
  const saveGenderPreference = async () => {
    try {
      let data = {
        userId,
        gender: mate,
      };
      // logEvent({
      //   eventName: eventNames.submitOnBoardGenderPreferenceButton,
      //   params: {...data, screenClass: screenClass.onBoarding},
      // })
      await saveUserProfile({
        variables: {
          userPreferenceInput: data,
        },
      })
        .then(async (res) => {
          navigation.navigate(screenName.BIRTHDAY);
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
  //     screenName: screenNames.onBoardGenderPreference,
  //     screenType: screenClass.onBoarding,
  //   })
  // }, [])

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <GradientLayout>
        <View style={styles.container}>
          <ProgressBar progress={0.3} color={"#0E0E2C"} />
          <View style={styles.genderContainer}>
            <Text style={styles.genderTitle}>
              Which gender do you want to be matched with?
            </Text>
            <View style={styles.genderTypesContainer}>
              <SelectButtons
                titles={["male", "female", "bisexual"]}
                funk={setMate}
              />
            </View>
          </View>
          <AppButton
            title={"Next"}
            disabled={mate === "" ? true : false}
            onPress={saveGenderPreference}
          />
        </View>
      </GradientLayout>
    </>
  );
};
