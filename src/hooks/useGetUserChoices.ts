import { Alert } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USER_CHOICES } from "../services/graphql/profile/queries";
import { setUserMatches } from "../store/features/matches/matchSlice";
import { selectUserId } from "../store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const useGetUserChoices = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);

  const { data, loading, error } = useQuery(GET_USER_CHOICES, {
    variables: {
      userId,
    },
    onCompleted: (data) => {
      dispatch(
        setUserMatches({
          userMatches: data.getUserChoices,
        })
      );
    },
    onError: (error) => {
      Alert.alert("Fetch Update Error", error.message);
    },
  });

  return { data, loading, error };
};
