import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { screenName } from "../../../utils/constants";
import { PromptAnswerModal } from "../../../features/Prompt/components/PromptAnswerModal";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { onScreenView } from "../../../analytics";

const OnboardPromptAnswer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const goBack = (answer: string) => {
    navigation.navigate({
      name: screenName.QUESTION_PROMPT,
      params: { ...prompt, answer },
      merge: true,
    });
  };

  const close = () => {
    navigation.navigate(screenName.QUESTION_PROMPT);
  };
  useEffect(() => {
    onScreenView({
      screenName: analyticScreenNames.onBoardWritePrompt,
      screenType: screenClass.onBoarding,
    });
  }, []);

  return <PromptAnswerModal goBack={goBack} close={close} />;
};

export default OnboardPromptAnswer;
