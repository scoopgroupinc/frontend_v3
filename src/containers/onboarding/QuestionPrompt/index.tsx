import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { styles } from "./styles";
import { ProgressBar } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { cloneArray, mapIndexToPrompts } from "../../../utils/helpers";
import { UserPrompts } from "../../../utils/types";
import { SAVE_USER_PROMPT_ORDER } from "../../../services/graphql/onboarding/mutations";
import {
  SAVE_ONBOARD_STATUS,
  SAVE_USER_PROMPTS,
} from "../../../services/graphql/profile/mutations";
import { screenName } from "../../../utils/constants";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import { CaptureText } from "../../../components/atoms/CaptureText";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { updateUser } from "../../../store/features/user/userSlice";

export const QuestionPromptScreen = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [counter, setCounter] = useState<number>(6);
  const initialData: UserPrompts[] = [...Array(counter)].map(mapIndexToPrompts);
  const [items, setItems] = useState(initialData);

  const [captureId, setCaptureId] = useState<string>("");

  const [saveUserPromptsOrder] = useMutation(SAVE_USER_PROMPT_ORDER);

  const answered_prompts = items.filter((item) => item.answer !== "");
  const UserPromptInput = answered_prompts.map((item) => {
    return {
      answer: item.answer,
      promptId: item.promptId,
      userId,
    };
  });

  const [saveOnBoardStatus] = useMutation(SAVE_ONBOARD_STATUS, {
    variables: {
      onboardInput: {
        userId,
        onBoarding: true,
        voteOnboard: false,
      },
    },
    onCompleted: () => {
      //load all necessary data here for the user
      dispatch(
        updateUser({
          value: {
            onBoarding: true,
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
      UserPromptInput: UserPromptInput,
    },
    onCompleted: (data) => {
      const { saveUserPrompts } = data;
      if (saveUserPrompts) {
        let ids: any = [];
        saveUserPrompts.forEach((item: any, index: number) => {
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

  useEffect(() => {
    if (route?.params?.item) {
      const { item } = route?.params;
      let newArray: UserPrompts[] = cloneArray(items);
      let index = newArray.findIndex((item) => Number(item.id) === Number(captureId));
      newArray[index] = {
        ...newArray[index],
        answer: item.answer,
        prompt: item.prompt,
        promptId: item.promptId,
        userId: item.userId,
      };
      setItems(newArray);
    }
    // onScreenView({
    //   screenName:screenNames.onBoardSelectPrompt,
    //   screenType:screenClass.onBoarding,
    // })
  }, [route?.params?.item]);

  const handlePromptChange = (id: string) => {
    setCaptureId(id);
    navigation.navigate(screenName.ALLPROMPTS);
  };

  const completeOnboard = async () => {
    setIsLoading(true);
    saveUserPrompts();
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <GradientLayout>
        <View style={styles.container}>
          <ProgressBar style={styles.progressBar} progress={0.7} color={"#0E0E2C"} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mediaContainer}>
              <View style={styles.mediaBox}>
                <Text style={styles.mediaHeader}>Add prompts</Text>
                {items?.map((item: any, index: any) => {
                  return (
                    <CaptureText
                      key={index}
                      addPrompt={() => {
                        setCaptureId(index);
                        navigation.navigate(screenName.ALLPROMPTS);
                      }}
                      prompt={item}
                      change={() => {
                        setCaptureId(index);
                        handlePromptChange(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>
          </ScrollView>
          <View style={{ paddingHorizontal: 20 }}>
            <AppButton
              disabled={UserPromptInput.length < 1}
              title={isLoading ? "Saving Prompts..." : "Complete"}
              onPress={completeOnboard}
            />
          </View>
        </View>
      </GradientLayout>
    </>
  );
};
