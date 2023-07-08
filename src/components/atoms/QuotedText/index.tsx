import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";
import { QuotedTextType } from "./types";

export const QuotedText = ({ title, text }: QuotedTextType) => (
  <View>
    <Text style={styles.quote}>"</Text>
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  </View>
);
