import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import { FullModalView } from "../FullModalView";
import { AppButton } from "../../../../components/atoms/AppButton";
import { screenName } from "../../../../utils/constants";
import {
  selectUserId,
  selectEditPrompt,
  selectEditPromptAnswer,
  setEditPrompt,
  setPromptOfEditIndex,
} from "../../../../store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectAllPrompts } from "../../../../store/features/prompts/promptsSlice";

interface PromptAnswerType {
  goBack: () => void;
  close: () => void;
}

export const PromptAnswerModal = ({ close, goBack }: PromptAnswerType) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const editPrompt = useAppSelector(selectEditPrompt);
  const editPromptAnswer = useAppSelector(selectEditPromptAnswer);
  const userId = useAppSelector(selectUserId);
  const [answer, setAnswer] = useState(editPromptAnswer);
  const allPrompts = useAppSelector(selectAllPrompts);
  const promptObj = allPrompts[editPrompt.promptId];

  useEffect(() => {
    setAnswer(editPromptAnswer);
  }, [editPromptAnswer]);
  const dispatch = useAppDispatch();

  const handleSavePrompt = () => {
    const prompt = { promptId: editPrompt.id, answer, prompt: editPrompt.prompt, userId };
    dispatch(setEditPrompt({ editPrompt: prompt }));
    dispatch(setPromptOfEditIndex(prompt));
    goBack();
  };

  const handleChangePrompt = () => {
    navigation.navigate(screenName.ALLPROMPTS);
  };

  return (
    <FullModalView done={handleSavePrompt} close={close}>
      <KeyboardAwareScrollView>
        <Pressable onPress={handleChangePrompt}>
          <View style={[styles.questionInput, styles.container]}>
            <Text>{promptObj?.prompt}</Text>
            <Entypo name="edit" size={24} color={Colors.ICON_FILL} />
          </View>
        </Pressable>
        <TextInput
          multiline
          numberOfLines={7}
          placeholder={editPrompt?.sample_answer}
          style={[styles.container, styles.textarea]}
          value={answer}
          onChangeText={setAnswer}
        />
        <AppButton
          isDisabled={!!(answer === "" || answer === "" || answer === undefined)}
          onPress={handleSavePrompt}
        >
          Done
        </AppButton>
      </KeyboardAwareScrollView>
    </FullModalView>
  );
};
