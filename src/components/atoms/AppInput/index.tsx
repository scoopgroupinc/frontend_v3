import React, { Ref, useState } from "react";
import {
  TextInput,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { Spacing, Colors } from "../../../utils";
import { InputProps } from "./types";

export const AppInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      autoCaps = true,
      label,
      password,
      onPressIn,
      onChangeText,
      value,
      visible,
      _typeOf,
      ...props
    }: InputProps,
    ref
  ) => {
    const [open, setOpen] = useState<boolean>(true);
    const toggleOpen = () => {
      setOpen((open) => !open);
    };
    return (
      <View
        style={{ marginTop: Spacing.SCALE_8, marginBottom: Spacing.SCALE_12 }}
      >
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={onPressIn}>
          <View pointerEvents="none">
            <TextInput
              {...props}
              value={value}
              onChangeText={onChangeText}
              autoCapitalize={autoCaps ? "sentences" : "none"}
              style={[styles.input]}
              secureTextEntry={password ? open : false}
              ref={ref as Ref<TextInput>}
            />
          </View>
        </TouchableOpacity>
        {password && (
          <Pressable style={styles.eye} onPress={toggleOpen}>
            <Ionicons
              name={open ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={Colors.ICON_FILL}
            />
          </Pressable>
        )}
        {_typeOf === "tag_field" && (
          <Pressable style={styles.eye}>
            <Ionicons
              name={!visible ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={Colors.ICON_FILL}
            />
          </Pressable>
        )}
      </View>
    );
  }
);
