import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Colors } from "../../../utils";
import { screenName } from "../../../utils/constants";
import { AppIconButton } from "../../../components/layouts/AppIconButton";
import { selectAllPrompts } from "../../../store/features/prompts/promptsSlice";
import { selectUserPrompts, setEditPrompt } from "../../../store/features/user/userSlice";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { ORIGIN } from "../constants";

interface d {
  id: string;
  prompt: string;
}

const AllPrompts = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [promptMap, setPromptMap] = useState(new Map());
  const allPrompts = useAppSelector(selectAllPrompts);
  const userPrompts = useAppSelector(selectUserPrompts);
  const [selectablePrompts, setSelectablePrompts] = useState(allPrompts);

  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const { origin } = route.params || {};

  const dispatch = useAppDispatch();

  useOnScreenView({
    screenName:
      origin === ORIGIN.ONBOARDING
        ? analyticScreenNames.onBoardAllPrompts
        : analyticScreenNames.profileAllPrompts,

    screenType: 
      origin === ORIGIN.ONBOARDING 
        ? screenClass.onBoarding 
        : screenClass.profile,
  });

  const choosePrompt = async (prompt: any) => {
    dispatch(setEditPrompt({ editPrompt: { ...prompt, answer: "" } }));
    navigation.navigate(screenName.PROMPT_ANSWER, {origin});
  };
  useEffect(() => {
    if ((userPrompts || []).length > 0) {
      const map = new Map();
      userPrompts.forEach((prompt) => {
        map.set(prompt.promptId, prompt);
      });
      setPromptMap(map);
    }
  }, [userPrompts]);

  useEffect(() => {
    if (allPrompts.length > 0) {
      setSelectablePrompts(allPrompts.filter((prompt: any) => !promptMap.has(prompt.id)));
    }
  }, [promptMap, allPrompts, userPrompts]);

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <View style={styles.headerContainer}>
          <View>
            <AppIconButton
              style={{ alignSelf: "flex-start", padding: 0 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="ios-chevron-back" size={32} color={Colors.ICON_FILL} />
            </AppIconButton>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Select a prompt</Text>
          </View>
        </View>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader} />
          <FlatList
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.ICON_INNER_SHADOW }} />
            )}
            showsVerticalScrollIndicator={false}
            data={selectablePrompts}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                }}
                onPress={() => choosePrompt(item)}
              >
                <Text>{item.prompt}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AllPrompts;
