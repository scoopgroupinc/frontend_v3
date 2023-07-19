import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CaptureText } from "./CaptureText";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { styles } from "./styles";
import { screenName } from "../../../../utils/constants";
import {
  selectUserPrompts,
  selectUserPromptsOrder,
  setEditPrompt,
  setEditPromptIndex,
} from "../../../../store/features/user/userSlice";

export const EditPromptList = ({
  title = "Prompts",
  origin,
}: {
  title: string;
  origin: string;
}) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const userPrompts = useAppSelector(selectUserPrompts);
  const promptIds = useAppSelector(selectUserPromptsOrder);

  // to do: refresh on change
  const n = 6;
  const emptyPrompts = Array.from({ length: n }, (_, index) => ({ index }));

  return (
    <View style={styles.mediaBox}>
      <Text style={styles.mediaHeader}>{title}</Text>
      {emptyPrompts?.map((emptyItem: any, index: any) => {
        const promptId = promptIds[index];

        const prompt = userPrompts[promptId] || emptyItem;
        return (
          <CaptureText
            key={index}
            onAdd={() => {
              dispatch(setEditPromptIndex({ editPromptIndex: index }));
              navigation.navigate(screenName.ALLPROMPTS, { origin });
            }}
            onEdit={() => {
              dispatch(setEditPromptIndex({ editPromptIndex: index }));
              dispatch(setEditPrompt({ editPrompt: prompt }));
              navigation.navigate(screenName.PROMPT_ANSWER, { origin });
            }}
            prompt={prompt}
            onSwap={() => {
              dispatch(setEditPromptIndex({ editPromptIndex: index }));
              navigation.navigate(screenName.ALLPROMPTS, { origin });
            }}
          />
        );
      })}
    </View>
  );
};
