import {NavigationScreenProp} from 'react-navigation'

export interface NavigationScreenType {
  navigation: NavigationScreenProp<any, any>
  route?: any
}

export interface FloatingNavProps {
  navigation: NavigationScreenProp<any, any>
  screen: string
}

export interface NavigationScreenProps {
  navigation: NavigationScreenProp<any, any>
  route?: any
}

export interface TagProps {
  name: string
}

export interface EduProps {
  name: string
  emoji: string
}
