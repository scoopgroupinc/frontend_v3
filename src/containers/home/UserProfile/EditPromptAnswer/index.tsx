import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { screenName } from "../../../../utils/constants";
import { PromptAnswerModal } from "../../../../features/Prompt/components/PromptAnswerModal";
import { ORIGIN } from "../../../../features/Prompt/constants";
import { useOnScreenView } from "../../../../analytics/hooks/useOnScreenView";
import { analyticScreenNames, screenClass } from "../../../../analytics/constants";

//
const EditPromptAnswer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // UserProfileEdit -> PromptAnswer -> PromptAnswerModal -> UserProfileEdit
  const goBack = () => {
    navigation.navigate(screenName.USER_PROFILE_EDIT);
  };

  const close = () => {
    navigation.navigate(screenName.USER_PROFILE_EDIT);
  };

  useOnScreenView({screenName:analyticScreenNames.profileAnswerPrompt,
    screenType:screenClass.profile});

  return <PromptAnswerModal goBack={goBack} close={close} origin={ORIGIN.PROFILE} />;
};

export default EditPromptAnswer;
