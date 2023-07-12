export type FloatingNavItem = {
  id: number;
  name: string;
  onPress: () => void;
  icon: string;
  isSelected: boolean;
};

export interface FloatingNavItemList {
  items: FloatingNavItem[];
}
