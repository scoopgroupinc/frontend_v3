import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { screenName } from "../../../utils/constants";
import { PromptAnswerModal } from "../../../components/templates/PromptAnswerModal";

const OnboardPromptAnswer = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { prompt } = route?.params;

  const goBack = (item: any) => {
    navigation.navigate({
      name: screenName.QUESTION_PROMPT,
      params: { item },
      merge: true,
    });
  };

  const close = () => {
    navigation.navigate(screenName.QUESTION_PROMPT);
  };
  // useEffect(()=>{
  //   onScreenView({
  //     screenName:screenNames.onBoardWritePrompt,
  //     screenType:screenClass.onBoarding,
  //    })
  // },[])

  return <PromptAnswerModal prompt={prompt} goBack={goBack} close={close} />;
}

export default OnboardPromptAnswer;
