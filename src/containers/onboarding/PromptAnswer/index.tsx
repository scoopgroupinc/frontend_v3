import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { screenName } from "../../../utils/constants";
import { PromptAnswerModal } from "../../../features/Prompt/components/PromptAnswerModal";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { useOnScreenView } from "../../../hooks/useOnScreenView";
import { ORIGIN } from "../../../features/Prompt/constants";

const OnboardPromptAnswer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const goBack = () => {
    navigation.navigate(screenName.QUESTION_PROMPT);
  };

  const close = () => {
    navigation.navigate(screenName.QUESTION_PROMPT);
  };
  
  useOnScreenView({screenName:analyticScreenNames.onBoardAnswerPrompt,
    screenType:screenClass.onBoarding});

  return <PromptAnswerModal goBack={goBack} close={close} />;
};

export default OnboardPromptAnswer;
