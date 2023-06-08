import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import { Button, IButtonProps } from "native-base";
import { FONT_FAMILY } from "../../../utils/typography/fonts";
import { styles } from "./styles";

export interface ButtonType {
  title: string;
  txtColor?: string;
  disabled?: boolean;
  bgColor?: any;
  onPress?: () => void;
  style?: ViewStyle;
}

export const AppButton = ({ children, variant, colorScheme, ...props }: IButtonProps) => {
  let button;
  if (variant === "ghost" || colorScheme === "orange") {
    button = (
      <Button
        {...props}
        variant={variant}
        colorScheme={colorScheme}
        _light={{
          _text: {
            color: "white",
            fontSize: "md",
          },
        }}
      >
        {children}
      </Button>
    );
  } else {
    button = (
      <Button {...props} variant={variant} colorScheme={colorScheme}>
        {children}
      </Button>
    );
  }
  return <>{button}</>;
};
