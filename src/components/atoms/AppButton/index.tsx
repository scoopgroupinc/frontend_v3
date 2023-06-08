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

export const AppButton = ({ children, variant, ...props }: IButtonProps) => {
  let button;
  if (variant === "ghost") {
    button = (
      <Button
        {...props}
        variant={variant}
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
      <Button {...props} variant={variant}>
        {children}
      </Button>
    );
  }
  return <>{button}</>;
};
