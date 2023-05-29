export interface ScreenType {
  addPrompt: () => void
  press?: () => void
  activeState?: boolean
  prompt: PromptsOrder
  change: any
}
export interface TextContainerType {
  handlePress: () => void
  active?: boolean
  prompt: PromptsOrder
  change: any
}
