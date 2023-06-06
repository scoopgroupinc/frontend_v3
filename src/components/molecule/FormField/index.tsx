import React, { PureComponent, useState } from "react";
import { TextInput, View, Text, Pressable } from "react-native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { Spacing, Colors } from "../../../utils";
import { styles } from "./styles";
import { FieldComponentState } from "./types";

type FieldComponentProps = {
  label: string;
  placeholder: string;
  inputType?: string;
  autoCaps?: "none" | "sentences" | "words" | "characters";
  value?: string;
  error?: boolean;
  textContentType?: "none";
  msg?: string;
  rules?: any;
  name?: string;
  control?: any;
};

const FieldComponent = ({
  label,
  placeholder,
  inputType,
  autoCaps,
  value,
  msg,
  rules,
  name,
  control,
  ...props
}: FieldComponentProps) => {
  const [hidePassword, sethidePassword] = useState(inputType === "password");
  return (
    <View style={{ marginTop: Spacing.SCALE_8, marginBottom: Spacing.SCALE_12 }}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.container}>
        <Controller
          rules={rules}
          name={name}
          defaultValue=""
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                {...props}
                autoCapitalize={autoCaps}
                style={[styles.input]}
                value={value}
                onChangeText={(value) => onChange(value)}
                placeholder={placeholder}
                onBlur={onBlur}
                secureTextEntry={hidePassword}
                keyboardType={inputType === "email" ? "email-address" : "default"}
              />
              {inputType === "password" && (
                <Pressable style={styles.eye} onPress={() => sethidePassword(!hidePassword)}>
                  <Ionicons
                    name={hidePassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color={Colors.ICON_FILL}
                  />
                </Pressable>
              )}
            </>
          )}
        />
      </View>
      {msg && <Text style={styles.errorText}>{msg}</Text>}
    </View>
  );
};

export default FieldComponent;
