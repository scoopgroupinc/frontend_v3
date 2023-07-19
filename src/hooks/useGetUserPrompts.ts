import { useQuery } from "@apollo/client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectUserId,
  setUserPrompts,
  setUserPromptsOrder,
} from "../store/features/user/userSlice";
import { GET_USER_ANSWERED_PROMPTS } from "../services/graphql/profile/queries";

export const useGetUserPrompts = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  // user prompts data
  const {
    data,
    loading: loadingPrompts,
    error,
  } = useQuery(GET_USER_ANSWERED_PROMPTS, {
    variables: {
      userId,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && !loadingPrompts) {
      dispatch(setUserPrompts({ userPrompts: data.getUserAnsweredPrompts.userPrompts }));
      dispatch(setUserPromptsOrder({ userPromptsOrder: data.getUserAnsweredPrompts.promptIds }));
    }
  }, [data, dispatch, loadingPrompts]);

  return {
    data,
    loading: loadingPrompts,
    error,
  };
};
