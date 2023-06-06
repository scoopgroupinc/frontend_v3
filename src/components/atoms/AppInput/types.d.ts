export interface InputProps extends TextInputProps {
  label?: string;
  password?: boolean;
  placeholder?: string;
  autoCaps?: boolean;
  onPressIn?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
  visible?: boolean;
  _typeOf?: "tag_field";
}
