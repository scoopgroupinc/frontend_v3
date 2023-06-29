import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { screenName } from "../../../../utils/constants";
import { PromptAnswerModal } from "../../../../features/Prompt/components/PromptAnswerModal";
import { ORIGIN } from "../../../../features/Prompt/constants";
import { useOnScreenView } from "../../../../hooks/useOnScreenView";
import { analyticScreenNames, screenClass } from "../../../../analytics/constants";

//
const EditPromptAnswer = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // UserProfileEdit -> PromptAnswer -> PromptAnswerModal -> UserProfileEdit
  const goBack = () => {
    navigation.navigate(screenName.EDIT_PROFILE);
  };

  const close = () => {
    navigation.navigate(screenName.EDIT_PROFILE);
  };

  useOnScreenView({screenName:analyticScreenNames.profileAnswerPrompt,
    screenType:screenClass.profile});

  return <PromptAnswerModal goBack={goBack} close={close} origin={ORIGIN.PROFILE} />;
};

export default EditPromptAnswer;
