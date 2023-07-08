import React from "react";
import { TouchableOpacity, Text, View, Pressable } from "react-native";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { styles } from "./styles";

import { ScreenType, TextContainerType } from "./types";
import { Colors } from "../../../../../utils";
import { AppIconButton } from "../../../../../components/layouts/AppIconButton";
import { selectAllPrompts } from "../../../../../store/features/prompts/promptsSlice";

const TextContainer = ({ prompt, onSwap, onEdit }: TextContainerType) => {
  const allPrompts = useSelector(selectAllPrompts);
  const promptObj = allPrompts[prompt.promptId];
  return (
    <View style={styles.textContainer}>
      <AppIconButton onPress={onSwap} style={styles.close}>
        <MaterialCommunityIcons name="refresh" size={20} color={Colors.BLACK} />
      </AppIconButton>
      <Pressable onPress={onEdit}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 18,
            color: Colors.BLACK,
          }}
        >
          {promptObj.prompt}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 16,
            color: Colors.DARK_GRAY_BLUE,
          }}
        >
          {prompt.answer}
        </Text>
      </Pressable>
    </View>
  );
};

export const CaptureText = ({ onAdd, onEdit, activeState, prompt, onSwap }: ScreenType) =>
  !prompt || prompt?.answer === undefined || prompt?.answer === "" ? (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: activeState ? "white" : Colors.ADD_PHOTO_BG }]}
      onPress={onAdd}
      onLongPress={onAdd}
    >
      <Octicons name="plus" size={20} color={Colors.WHITE} />
    </TouchableOpacity>
  ) : (
    <TextContainer
      key={prompt.id}
      onEdit={onEdit}
      active={activeState}
      prompt={prompt}
      onSwap={onSwap}
    />
  );
