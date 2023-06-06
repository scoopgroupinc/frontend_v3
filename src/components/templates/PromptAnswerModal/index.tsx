import React, { useEffect, useState } from "react";
import { Alert, View, Text, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./styles";
import { Colors } from "../../../utils";
import { FullModalView } from "../../molecule/FullModalView";
import { useAppSelector } from "../../../store/hooks";
import { AppButton } from "../../atoms/AppButton";

interface PromptAnswerType {
  goBack: (item: any) => void;
  close: () => void;
  prompt: any;
}

export const PromptAnswerModal = ({ close, goBack, prompt }: PromptAnswerType) => {
  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;

  const [answer, setAnswer] = useState<string>("");

  const handleSavePrompt = () => {
    if (prompt?.answer !== "" && answer === "") {
      Alert.alert("You have already answered this prompt");
      return;
    }

    const itemObject = {
      userId,
      promptId: prompt?.id,
      prompt: prompt?.prompt,
      answer,
    };
    goBack(itemObject);
  };

  useEffect(() => {
    if (prompt?.answer !== "") {
      setAnswer(prompt?.answer);
    }
  }, []);

  return (
    <FullModalView done={handleSavePrompt} close={close}>
      <KeyboardAwareScrollView>
        <View style={[styles.questionInput, styles.container]}>
          <Text>{prompt.prompt}</Text>
          <Entypo name="edit" size={24} color={Colors.ICON_FILL} />
        </View>
        <TextInput
          multiline
          numberOfLines={7}
          placeholder={prompt?.sample_answer}
          style={[styles.container, styles.textarea]}
          value={answer}
          onChangeText={setAnswer}
        />
        <AppButton
          title="Done"
          disabled={!!(answer === "" || answer === "" || answer === undefined)}
          onPress={handleSavePrompt}
        />
      </KeyboardAwareScrollView>
    </FullModalView>
  );
}
