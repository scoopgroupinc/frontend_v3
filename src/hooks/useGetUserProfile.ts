import { useQuery } from "@apollo/client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectUserId,
  setFetchedUserVisuals,
  setUserProfile,
  setUserProfileVisibilityData,
  setUserPrompts,
  setUserPromptsOrder,
} from "../store/features/user/userSlice";
import { GET_FULL_PROFILE } from "../services/graphql/profile/queries";
import { UserPrompt } from "../utils/types";
import { UserTagsTypeVisibleEnity } from "../store/features/user/types";

export const useGetUserProfile = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  // user prompts data
  const { data, loading, error } = useQuery(GET_FULL_PROFILE, {
    variables: {
      userId,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && data?.getFullProfile && !loading) {
      dispatch(setUserProfile({ userProfile: data.getFullProfile }));
      if (data.getFullProfile?.visuals) {
        dispatch(setFetchedUserVisuals({ userVisuals: data.getFullProfile?.visuals }));
      }
      if (data.getFullProfile?.prompts && data.getFullProfile?.prompts.length > 0) {
        dispatch(setUserPrompts({ userPrompts: data.getFullProfile?.prompts as UserPrompt[] }));
      }
      if (data.getFullProfile?.promptIds) {
        dispatch(setUserPromptsOrder({ userPromptsOrder: data.getFullProfile?.promptIds }));
      }
      if (data.getFullProfile?.tags) {
        const userTags = {};
        data.getFullProfile.tags.forEach((item: UserTagsTypeVisibleEnity) => {
          userTags[item.tagType] = {
            userId: item.userId,
            tagType: item.tagType,
            userTags:
              item.userTags.length === 0
                ? item.userTags
                : item.userTags?.map((tag: any) => ({
                    userId: item.userId,
                    tagName: tag.tagName,
                    tagType: tag.tagType,
                    tagId: tag.tagId,
                  })),
            visible: item.visible,
          };
        });
        dispatch(
          setUserProfileVisibilityData({
            userTags,
          })
        );
      }
    }
  }, [data, dispatch, loading]);

  return {
    data,
    loading,
    error,
  };
};
