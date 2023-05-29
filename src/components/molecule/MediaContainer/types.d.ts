import React, {useRef} from 'react'

interface replaceImageProps {
  index: number
  imageUri: string | null
}

export interface ScreenType {
  images?: any[]
  onAddImage: (uri: replaceImageProps | null) => void
}
