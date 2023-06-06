import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { ModalType } from "./types";
import { GradientLayout } from "../../layouts/GradientLayout";

export const FullModalView = ({ children, close, done }: ModalType) => (
    <GradientLayout>
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={styles.textContainer}>
          {/* <Pressable onPress={close}>
            <Text style={[styles.text, styles.textSmall]}>Cancel</Text>
          </Pressable> */}

          <Text style={[styles.text, styles.textBig]}>Write an Answer</Text>
          {/* <TouchableOpacity>
            <Text style={[styles.text, styles.textSmall]} onPress={done}>
              Done
            </Text>
          </TouchableOpacity> */}
          <Pressable onPress={close}>
            <Text style={[styles.text, styles.textSmall]}>Cancel</Text>
          </Pressable>
        </View>
        <View style={styles.children}>
          <View style={styles.listView}>{children}</View>
        </View>
      </View>
    </GradientLayout>
  )
