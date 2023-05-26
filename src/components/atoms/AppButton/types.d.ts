import { ViewStyle } from 'react-native';

export interface ButtonType {
  style?: ViewStyle;
  text?: string;
  title: string;
  color?: string;
  disabled?: boolean;
  fade?: boolean;
  spinner?: boolean;
  onPress?: () => void;
}
