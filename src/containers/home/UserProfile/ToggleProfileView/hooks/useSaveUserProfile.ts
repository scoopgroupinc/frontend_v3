import { SAVE_USER_TAGS_TYPE_VISIBLE } from "../../../../../services/graphql/profile/mutations";
import { useMutation } from "@apollo/client";
import { useAppSelector } from "../../../../../store/hooks";
import { selectUserProfile, selectIsUserProfileDirty } from "../../../../../store/features/user/userSlice";

export const useSaveUserProfile = () => {
  
  const userProfile = useAppSelector(selectUserProfile);
  const isUserProfileDirty = useAppSelector(selectIsUserProfileDirty);

  const [save] = useMutation(SAVE_USER_TAGS_TYPE_VISIBLE, {
    variables: {
      userTagsTypeVisibleInput: userProfile,
    },
  });

  // handles whether we need to save user tags
  return [!userProfile || !isUserProfileDirty ? null : save];
};
