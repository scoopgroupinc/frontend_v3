import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch } from "../../../../store/hooks";
import { screenName } from "../../../../utils/constants";
import { PromptAnswerModal } from "../../../../components/templates/PromptAnswerModal";

const PromptAnswer = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  const { prompt } = route?.params;

  const goBack = (item: any) => {
    navigation.navigate({
      name: screenName.EDIT_PROFILE,
      params: { item },
      merge: true,
    });
  };
  // dispatch(
  //   setPromptAnswer({
  //     promptAnswer: item,
  //   })
  // )
  // dispatch(
  //   updateAllPrompts({
  //     promptId: item.promptId,
  //   })
  // )
  // navigation.popToTop()
  // }

  const close = () => {
    navigation.navigate(screenName.EDIT_PROFILE);
  };

  return <PromptAnswerModal goBack={goBack} close={close} prompt={prompt} />;
};

export default PromptAnswer;
