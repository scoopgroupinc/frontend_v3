import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { screenName } from "../../../utils/constants";
import { PromptAnswerModal } from "../../../features/Prompt/components/PromptAnswerModal";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { ORIGIN } from "../../../features/Prompt/constants";
import { useSegment } from "../../../analytics";

const OnboardPromptAnswer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const analytics = useSegment();

  analytics.screenEvent({
    screenName: analyticScreenNames.onBoardAnswerPrompt,
    screenType: screenClass.onBoarding,
  });

  // PromptAnswer (OnboardPromptAnswer) -> PromptAnswerModal -> UserProfileEdit
  const goBack = () => {
    navigation.navigate(screenName.QUESTION_PROMPT);
  };

  const close = () => {
    navigation.navigate(screenName.QUESTION_PROMPT);
  };

  return <PromptAnswerModal goBack={goBack} close={close} origin={ORIGIN.ONBOARDING} />;
};

export default OnboardPromptAnswer;
