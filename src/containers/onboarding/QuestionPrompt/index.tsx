/* eslint-disable import/prefer-default-export */
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { ProgressBar } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { SAVE_USER_PROMPT_ORDER } from "../../../services/graphql/onboarding/mutations";
import {
  SAVE_ONBOARD_STATUS,
  SAVE_USER_PROMPTS,
} from "../../../services/graphql/profile/mutations";
import { screenName } from "../../../utils/constants";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import { CaptureText } from "../../../features/Prompt/components/CaptureText";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import {
  selectUserId,
  updateUser,
  setEditPromptIndex,
  setEditPrompt,
  selectUserPrompts,
} from "../../../store/features/user/userSlice";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { onScreenView } from "../../../analytics";

export const QuestionPromptScreen = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const userId = useAppSelector(selectUserId);
  const userPrompts = useAppSelector(selectUserPrompts);
  let userPromptInput: never[] = [];

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [saveUserPromptsOrder] = useMutation(SAVE_USER_PROMPT_ORDER);

  const [saveOnBoardStatus] = useMutation(SAVE_ONBOARD_STATUS, {
    variables: {
      onboardInput: {
        userId,
        isOnboarded: true,
        isVoteOnboarded: false,
      },
    },
    onCompleted: () => {
      // load all necessary data here for the user
      dispatch(
        updateUser({
          value: {
            isOnboarded: true,
          },
        })
      );
      setIsLoading(false);
    },
    onError: (error) => {
      setIsLoading(false);
      Alert.alert("Error", "Something went wrong");
    },
  });

  const [saveUserPrompts] = useMutation(SAVE_USER_PROMPTS, {
    variables: {
      UserPromptInput: userPromptInput,
    },
    onCompleted: (data) => {
      console.log("data", data, userPromptInput);
      const { saveUserPrompts: prompts } = data;
      if (prompts) {
        const ids: any = [];
        console.log("prompts", prompts);
        prompts.forEach((item: any, index: number) => {
          if (item.id !== ids[index]) {
            ids[index] = item.id;
          }
        });

        saveUserPromptsOrder({
          variables: {
            UserPromptsOrder: {
              userId,
              userPromptIds: ids,
            },
          },
          onCompleted: async (e) => {
            saveOnBoardStatus();
          },
          onError: (e) => {
            setIsLoading(false);
          },
        });
      }
    },
    onError: (error) => {
      setIsLoading(false);
    },
  });

  const completeOnboard = async () => {
    setIsLoading(true);
    userPromptInput = userPrompts
      .filter((item: { answer: string }) => item.answer !== "")
      .map((item: { answer: string; promptId: string; userId: string }) => ({
        answer: item.answer,
        promptId: item.promptId,
        userId,
      }));
    console.log(userPromptInput);
    saveUserPrompts();
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <GradientLayout>
        <View style={styles.container}>
          <ProgressBar style={styles.progressBar} progress={0.7} color="#0E0E2C" />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mediaContainer}>
              <View style={styles.mediaBox}>
                <Text style={styles.mediaHeader}>Add prompts</Text>
                {userPrompts?.map((item: any, index: any) => (
                  <CaptureText
                    key={index}
                    onAdd={() => {
                      dispatch(setEditPromptIndex({ editPromptIndex: index }));
                      navigation.navigate(screenName.ALLPROMPTS);
                    }}
                    onEdit={() => {
                      dispatch(setEditPromptIndex({ editPromptIndex: index }));
                      dispatch(setEditPrompt({ editPrompt: item }));
                      navigation.navigate(screenName.PROMPT_ANSWER, { prompt: item });
                    }}
                    prompt={item}
                    onSwap={() => {
                      dispatch(setEditPromptIndex({ editPromptIndex: index }));
                      navigation.navigate(screenName.ALLPROMPTS);
                    }}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
          <View style={{ paddingHorizontal: 20 }}>
            <AppButton isDisabled={userPrompts.length < 1} onPress={completeOnboard}>
              {isLoading ? "Saving Prompts..." : "Complete"}
            </AppButton>
          </View>
        </View>
      </GradientLayout>
    </>
  );
};
