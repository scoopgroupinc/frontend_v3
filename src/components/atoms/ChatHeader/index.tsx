import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";

import { styles } from "./styles";

const ChatHeader = ({ username, photo }: { username: string; photo: string }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback style={styles.backBtn} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={20} color="black" />
      </TouchableWithoutFeedback>
      <Text style={styles.chatName}>{username}</Text>
      <Image
        resizeMode="cover"
        style={styles.chatImage}
        source={{
          uri: photo,
        }}
      />
    </View>
  );
};

export default ChatHeader;
