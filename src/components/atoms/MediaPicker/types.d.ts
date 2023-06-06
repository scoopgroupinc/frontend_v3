export interface imageContainer {
  uri: string;
  change: (image: replaceImageProps) => void;
}

interface replaceImageProps {
  index: number;
  imageUri: string | null;
}

export interface ScreenType {
  index: number;
  onChangeImage: (image: replaceImageProps) => void;
  item?: UserVisualsType;
}
