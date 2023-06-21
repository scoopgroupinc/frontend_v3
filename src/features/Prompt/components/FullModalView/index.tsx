import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { ModalType } from "./types";
import { GradientLayout } from "../../../../components/layouts/GradientLayout";

export const FullModalView = ({ children, close }: ModalType) => (
  <GradientLayout>
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.textBig]}>Write an Answer</Text>

        <Pressable onPress={close}>
          <Text style={[styles.text, styles.textSmall]}>Cancel</Text>
        </Pressable>
      </View>
      <View style={styles.children}>
        <View style={styles.listView}>{children}</View>
      </View>
    </View>
  </GradientLayout>
);
