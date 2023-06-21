import React from "react";
import { TouchableOpacity, Text, View, Pressable } from "react-native";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { styles } from "./styles";

import { ScreenType, TextContainerType } from "./types";
import { Colors } from "../../../../utils";
import { AppIconButton } from "../../../../components/layouts/AppIconButton";

export const CaptureText = ({ onAdd, onEdit, activeState, prompt, onSwap }: ScreenType) =>
  prompt && prompt?.answer === "" ? (
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

const TextContainer = ({ prompt, onSwap, onEdit }: TextContainerType) => (
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
        {prompt.prompt}
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
