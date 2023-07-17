import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { GET_USER_PREFERENCE } from "../services/graphql/profile/queries";
import { selectUserId, setUserPreference } from "../store/features/user/userSlice";

export const useGetUserPreference = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const { data: userPreferenceData, error } = useQuery(GET_USER_PREFERENCE, {
    variables: { userId },
  });

  useEffect(() => {
    if (userPreferenceData) {
      dispatch(
        setUserPreference({
          userPreference: userPreferenceData.getUserPreference,
        })
      );
    }
  }, [userPreferenceData, dispatch]);

  return [error];
};
