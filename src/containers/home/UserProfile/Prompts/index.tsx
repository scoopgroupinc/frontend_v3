import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { useAppSelector } from "../../../../store/hooks";
import { Colors } from "../../../../utils";
import { screenName } from "../../../../utils/constants";
import { AppIconButton } from "../../../../components/layouts/AppIconButton";
import { selectAllPrompts } from "../../../../store/features/prompts/promptsSlice";

interface d {
  id: string;
  prompt: string;
}

const AllPrompts = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const allPrompts = useAppSelector(selectAllPrompts);

  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const choosePrompt = async (prompt: any) => {
    navigation.navigate(screenName.ONBOARD_PROMPT_ANSWER, {
      prompt,
    });
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
              <MaterialIcons name="keyboard-arrow-left" size={32} color={Colors.ICON_FILL} />
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
            data={allPrompts}
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
}

export default AllPrompts;
