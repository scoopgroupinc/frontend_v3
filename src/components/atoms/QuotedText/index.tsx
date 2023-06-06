import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./style";
import { QuotedTextType } from "./types";

export const QuotedText = ({ title, text }: QuotedTextType) => {
  return (
    <View>
      <Image
        source={require("src/assets/images/quote.png")}
        style={{ position: "absolute" }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};
