import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useMutation } from "@apollo/client";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Heading, VStack } from "native-base";
import { styles } from "./styles";
import { useAppSelector } from "../../../store/hooks";
import { SAVE_USER_GENDER } from "../../../services/graphql/profile/mutations";
import { screenName } from "../../../utils/constants";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import { SelectButtons } from "../../../components/layouts/SelectButtons";

export const GenderScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;

  const [gender, setGender] = useState<string>("");

  const [saveUserProfile, { loading }] = useMutation(SAVE_USER_GENDER);
  const saveUserGender = async () => {
    try {
      const data = {
        userId,
        gender,
      };
      // logEvent({
      //   eventName: eventNames.submitOnBoardGenderButton,
      //   params:{...data, screenClass:screenClass.onBoarding}
      // })
      await saveUserProfile({
        variables: {
          UserProfileInput: data,
        },
      })
        .then(async (res) => {
          navigation.navigate(screenName.DATE_WHO);
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
  //     screenName: screenNames.onBoardGender,
  //     screenType: screenClass.onBoarding,
  //   });
  // }, []);

  return (
    <GradientLayout>
      <View style={styles.body}>
        <ProgressBar progress={0.2} color="#0E0E2C" />
        <VStack space={24} style={styles.btnContainer}>
          <Heading>What gender do you identify with?</Heading>
          <SelectButtons titles={["male", "female"]} funk={setGender} />
        </VStack>
        <AppButton isDisabled={gender === ""} onPress={saveUserGender}>
          Next
        </AppButton>
      </View>
    </GradientLayout>
  );
};
