import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { GET_USER_TAGS_TYPE_VISIBLE } from "../services/graphql/profile/queries";
import { selectUserId, setUserProfileVisibilityData } from "../store/features/user/userSlice";
import { UserTagsTypeVisibleEnity } from "../store/features/user/types";

export const useGetUserTags = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const {
    data: userTagsResult,
    error,
    loading: userTagsLoading,
  } = useQuery(GET_USER_TAGS_TYPE_VISIBLE, {
    variables: { userId },
  });

  useEffect(() => {
    if (userTagsResult && !userTagsLoading) {
      const { getAllUserTagsTypeVisible } = userTagsResult;
      const userProfileVisibility = {};
      getAllUserTagsTypeVisible.forEach((item: UserTagsTypeVisibleEnity) => {
        userProfileVisibility[item.tagType] = {
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
          userTags: userProfileVisibility,
        })
      );
    }
  }, [userTagsResult, userTagsLoading, dispatch]);

  return [error];
};
