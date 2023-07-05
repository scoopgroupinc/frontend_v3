import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { Colors } from "../../../utils";
import { AppIconButton } from "../../layouts/AppIconButton";

interface tagScreenProps {
  title: string;
  close: () => void;
}

const TagScreenHeader = ({ title, close }: tagScreenProps) => (
  <View style={styles.headerContainer}>
    <View>
      <AppIconButton style={{ alignSelf: "flex-start", padding: 0 }} onPress={close}>
        <Ionicons name="ios-chevron-back" size={32} color={Colors.ICON_FILL} />
      </AppIconButton>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.text}>{title}</Text>
    </View>
  </View>
);

export default TagScreenHeader;
