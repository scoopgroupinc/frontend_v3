import React from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./style";
import { QuotedTextType } from "./types";

export const QuotedText = ({ title, text }: QuotedTextType) => (
  <View>
    <Image source={require("../../../assets/images/quote.png")} style={{ position: "absolute", left: -50 }} />
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.textContainerBg}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  </View>
);
