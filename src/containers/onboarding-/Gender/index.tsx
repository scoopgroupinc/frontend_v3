import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";
import { styles } from "./styles";
import { ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppSelector } from "../../../store/hooks";
import { SAVE_USER_GENDER } from "../../../services/graphql/profile/mutations";
import { screenName } from "../../../utils/constants";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { Colors, Typography } from "../../../utils";
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
      let data = {
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
        <ProgressBar progress={0.2} color={"#0E0E2C"} />
        <View style={styles.btnContainer}>
          <Text style={styles.genderTitle}>
            What gender do you identify with?
          </Text>
          <SelectButtons titles={["male", "female"]} funk={setGender} />
        </View>
        <AppButton
          title={"Next"}
          disabled={gender === "" ? true : false}
          onPress={saveUserGender}
        />
      </View>
    </GradientLayout>
  );
};
