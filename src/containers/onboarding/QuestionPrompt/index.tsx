/* eslint-disable import/prefer-default-export */
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { ProgressBar } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { useAppSelector } from "../../../store/hooks";
import { SAVE_ONBOARD_STATUS } from "../../../services/graphql/profile/mutations";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { selectUserId, selectUserPrompts } from "../../../store/features/user/userSlice";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import { EditPromptList } from "../../../features/Prompt/components/EditPromptList";
import { ORIGIN } from "../../../features/Prompt/constants";
import { useSaveUserPrompts } from "../../home/UserProfile/ToggleProfileView/hooks/useSaveUserPrompts";
import { screenName } from "../../../utils/constants";

export const QuestionPromptScreen = () => {
  const userId = useAppSelector(selectUserId);
  const userPrompts = useAppSelector(selectUserPrompts);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useOnScreenView({
    screenName: analyticScreenNames.onBoardAllPrompts,
    screenType: screenClass.onBoarding,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [saveUserPrompts] = useSaveUserPrompts();

  const [saveOnBoardStatus] = useMutation(SAVE_ONBOARD_STATUS, {
    variables: {
      onboardInput: {
        userId,
        isOnboarded: true,
        isVoteOnboarded: false,
      },
    },
    onCompleted: () => {
      navigation.navigate(screenName.SHARE_FOR_FEEDBACK);
      setIsLoading(false);
    },
  });

  // TO DO: make sure save works
  const completeOnboard = async () => {
    setIsLoading(true);
    try {
      if (saveUserPrompts) {
        saveUserPrompts();
      }
      saveOnBoardStatus();
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <GradientLayout>
        <View style={styles.container}>
          <ProgressBar style={styles.progressBar} progress={0.7} color="#0E0E2C" />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mediaContainer}>
              <EditPromptList title="Add prompts" origin={ORIGIN.ONBOARDING} />
            </View>
          </ScrollView>
          <View style={{ paddingHorizontal: 20 }}>
            <AppButton isDisabled={!userPrompts} onPress={completeOnboard}>
              {isLoading ? "Saving Prompts..." : "Complete"}
            </AppButton>
          </View>
        </View>
      </GradientLayout>
    </>
  );
};
