export interface ScreenType {
  activeState?: boolean;
  prompt: PromptsOrder;
  onAdd: () => void;
  onEdit: () => void;
  onSwap: () => void;
}
export interface TextContainerType {
  active?: boolean;
  prompt: PromptsOrder;
  onEdit: () => void;
  onSwap: () => void;
}
