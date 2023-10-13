import { useMutation } from "@apollo/client";
import { SAVE_USER_TAGS_TYPE_VISIBLE } from "../../../../../services/graphql/profile/mutations";
import { useAppSelector } from "../../../../../store/hooks";
import {
  selectUserTags,
  selectisUserTagsDirty,
} from "../../../../../store/features/user/userSlice";

export const useSaveUserProfile = () => {
  const userTags = useAppSelector(selectUserTags);
  const isUserTagsDirty = useAppSelector(selectisUserTagsDirty);

  const [save] = useMutation(SAVE_USER_TAGS_TYPE_VISIBLE, {
    variables: {
      userTagsTypeVisibleInput: Object.values(userTags),
    },
  });

  // handles whether we need to save user tags
  return [!userTags || !isUserTagsDirty ? null : save];
};
