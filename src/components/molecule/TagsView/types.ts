import { TagProps } from "src/types/globals";

export interface TagsViewProps {
  currentTagType: string;
  tags?: TagProps[];
  typeOf?: string;
}
