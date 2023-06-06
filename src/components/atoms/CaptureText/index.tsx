import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { styles } from "./styles";

import { ScreenType, TextContainerType } from "./types";
import { Colors } from "../../../utils";
import { AppIconButton } from "../../layouts/AppIconButton";

export const CaptureText = ({ addPrompt, press, activeState, prompt, change }: ScreenType) => (
  <>
    {prompt && prompt?.answer === "" ? (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: activeState ? "white" : Colors.ADD_PHOTO_BG }]}
        onPress={addPrompt}
        onLongPress={press}
      >
        <Octicons name="plus" size={20} color={Colors.WHITE} />
      </TouchableOpacity>
    ) : (
      <TextContainer
        key={prompt.id}
        handlePress={press || (() => {})}
        active={activeState}
        prompt={prompt}
        change={change}
      />
    )}
  </>
);

const TextContainer = ({ handlePress, prompt, change }: TextContainerType) => (
  <View style={styles.textContainer}>
    <AppIconButton onPress={change} style={styles.close}>
      <MaterialCommunityIcons name="refresh" size={20} color={Colors.BLACK} />
    </AppIconButton>
    <>
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
    </>
  </View>
);
