import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { GET_USER_TAGS_TYPE_VISIBLE } from "../services/graphql/profile/queries";
import { selectUserId, setUserProfile } from "../store/features/user/userSlice";

export const useGetUserTags = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const { data: userProfileResult, error } = useQuery(GET_USER_TAGS_TYPE_VISIBLE, {
    variables: { userId },
  });

  useEffect(() => {
    if (userProfileResult) {
      const { getAllUserTagsTypeVisible } = userProfileResult;
      const modifiedResult: any = getAllUserTagsTypeVisible.map((item: any) => ({
        userId: item.userId,
        tagType: item.tagType,
        userTags:
          item.userTags.length === 0
            ? item.userTags
            : item.userTags?.map((tag: any) => ({
                userId: item.userId,
                tagName: tag.tagName,
                tagType: tag.tagType,
              })),
        visible: item.visible,
        emoji: item.emoji,
      }));
      dispatch(
        setUserProfile({
          userProfile: modifiedResult,
        })
      );
    }
  }, [dispatch, userProfileResult]);

  return [error];
};
