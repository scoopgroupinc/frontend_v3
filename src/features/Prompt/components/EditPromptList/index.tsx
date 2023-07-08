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
  setEditPrompt,
  setEditPromptIndex,
} from "../../../../store/features/user/userSlice";

export const EditPromptList = ({ title = "Prompts" }: { title: string }) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const userPrompts = useAppSelector(selectUserPrompts);
  const n = 6;
  const emptyPrompts = Array.from({ length: n }, (_, index) => ({ index }));

  return (
    <View style={styles.mediaBox}>
      <Text style={styles.mediaHeader}>{title}</Text>
      {emptyPrompts?.map((emptyItem: any, index: any) => {
        const prompt = userPrompts[index] || emptyItem;
        return (
          <CaptureText
            key={index}
            onAdd={() => {
              dispatch(setEditPromptIndex({ editPromptIndex: index }));
              navigation.navigate(screenName.ALLPROMPTS);
            }}
            onEdit={() => {
              dispatch(setEditPromptIndex({ editPromptIndex: index }));
              dispatch(setEditPrompt({ editPrompt: prompt }));
              navigation.navigate(screenName.PROMPT_ANSWER, { prompt });
            }}
            prompt={prompt}
            onSwap={() => {
              dispatch(setEditPromptIndex({ editPromptIndex: index }));
              navigation.navigate(screenName.ALLPROMPTS);
            }}
          />
        );
      })}
    </View>
  );
};
