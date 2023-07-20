import React from "react";
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
import { setEditPrompt } from "../../../store/features/user/userSlice";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { ORIGIN } from "../constants";
import { selectAvailablePrompts } from "../../../store/features/prompts/selectEditPromptDefaults";

interface d {
  id: string;
  prompt: string;
}

const LineSeperator = () => <View style={{ height: 2, backgroundColor: Colors.LIGHT_GRAY }} />;
const AllPrompts = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const selectablePrompts = useAppSelector(selectAvailablePrompts);

  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const { origin } = route.params || {};

  const dispatch = useAppDispatch();

  useOnScreenView({
    screenName:
      origin === ORIGIN.ONBOARDING
        ? analyticScreenNames.onBoardAllPrompts
        : analyticScreenNames.profileAllPrompts,

    screenType: origin === ORIGIN.ONBOARDING ? screenClass.onBoarding : screenClass.profile,
  });

  const choosePrompt = async (prompt: any) => {
    dispatch(setEditPrompt({ editPrompt: { ...prompt, answer: "" } }));
    navigation.navigate(screenName.PROMPT_ANSWER, { origin });
  };

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
            ItemSeparatorComponent={LineSeperator}
            showsVerticalScrollIndicator={false}
            data={Object.values(selectablePrompts)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                }}
                onPress={() => choosePrompt(item)}
              >
                <Text style={styles.optionText}>{item.prompt}</Text>
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
