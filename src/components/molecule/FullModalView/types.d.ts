export interface ModalType {
  children: ReactNode
  close: () => void
  done: any
}

export interface ItemType {
  question: string
  answer: string
}
