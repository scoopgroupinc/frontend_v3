import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { URLS } from "../../../utils/constants/apis";
import {
  setUserChoiceImages,
  setUserChoices,
  selectUserChoices,
  setUserChoicePrompts,
} from "../../../store/features/matches/matchSlice";
import { selectUserId } from "../../../store/features/user/userSlice";
import { GET_DISPLAYED_PROMPTS, GET_USER_CHOICES } from "../../../services/graphql/profile/queries";

export const useFetchChoicesData = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const [userChoiceId, setUserChoiceId] = useState<string>("");
  const userChoices = useAppSelector(selectUserChoices);

  const { data: userChoicesResult } = useQuery(GET_USER_CHOICES, {
    variables: {
      userId,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      if (userChoicesResult?.getUserChoices && userChoicesResult?.getUserChoices?.length > 0) {
        setUserChoiceId(userChoicesResult?.getUserChoices[0]?.shownUserId);
        dispatch(
          setUserChoices({
            userChoices: userChoicesResult?.getUserChoices,
          })
        );
      }
    },
    onError: () => {},
  });

  // TODO: set userChoice Prompts
  useEffect(() => {
    if (userChoiceId) {
      const { data: promptsOrderResult, loading: promptsOrderLoading } = useQuery(
        GET_DISPLAYED_PROMPTS,
        {
          variables: {
              userId: userChoiceId,
            },
        }
      );
    }
  }, [userChoiceId]);

  useEffect(() => {
    // load images for the next screen
    const fetchChoiceVisuals = async () => {
      await fetch(`${URLS.FILE_URL}/api/v1/visuals/${userChoiceId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            dispatch(
              setUserChoiceImages({
                userChoiceImages: res,
              })
            );
          }
        })
        .catch(() => {});
    };

    fetchChoiceVisuals();
  }, [setUserChoicePrompts, dispatch, userChoiceId]);

  return [];
};
