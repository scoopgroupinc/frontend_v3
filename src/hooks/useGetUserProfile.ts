import { useQuery } from "@apollo/client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUserId, setUserProfile } from "../store/features/user/userSlice";
import { GET_USER_PROFILE } from "../services/graphql/profile/queries";

export const useGetUserProfile = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  // user prompts data
  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: {
      userId,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && !loading) {
      dispatch(setUserProfile({ userProfile: data.getUserProfile }));
    }
  }, [data, dispatch, loading]);

  return {
    data,
    loading,
    error,
  };
};
