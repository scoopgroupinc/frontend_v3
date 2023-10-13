import { NavigationScreenProp } from "react-navigation";

export interface NavigationScreenType {
  navigation: NavigationScreenProp<any, any>;
  route?: any;
}

export interface FloatingNavProps {
  navigation: NavigationScreenProp<any, any>;
  screen: string;
}

export interface NavigationScreenProps {
  navigation: NavigationScreenProp<any, any>;
  route?: any;
}

export interface TagProps {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  type: tag_type;
  name: string;
  visible: boolean;
  emoji: string;
  order?: number;
}

export interface TagsById {
    [id: string]: Tag;
}

export interface TagsByName {
    [name: tag_type]: Tag;
}