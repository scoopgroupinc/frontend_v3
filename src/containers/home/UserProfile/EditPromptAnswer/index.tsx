import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { screenName } from "../../../../utils/constants";
import { PromptAnswerModal } from "../../../../features/Prompt/components/PromptAnswerModal";

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

  return <PromptAnswerModal goBack={goBack} close={close} />;
};

export default EditPromptAnswer;
