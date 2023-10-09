import { useMutation } from "@apollo/client";
import { SAVE_USER_TAGS_TYPE_VISIBLE } from "../../../../../services/graphql/profile/mutations";
import { useAppSelector } from "../../../../../store/hooks";
import {
  selectUserTags,
  selectIsUserProfileDirty,
} from "../../../../../store/features/user/userSlice";

export const useSaveUserProfile = () => {
  const userTags = useAppSelector(selectUserTags);
  const isUserProfileDirty = useAppSelector(selectIsUserProfileDirty);

  const [save] = useMutation(SAVE_USER_TAGS_TYPE_VISIBLE, {
    variables: {
      userTagsTypeVisibleInput: Object.values(userTags),
    },
  });

  // handles whether we need to save user tags
  return [!userTags || !isUserProfileDirty ? null : save];
};
