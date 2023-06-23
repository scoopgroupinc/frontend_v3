import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import axios from "axios";
import { URLS } from "../../../utils/constants/apis";
import { GET_USER_PROMPTS } from "../../../services/graphql/onboarding/queries";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { GET_PROMPTS_ORDER, GET_USER_PREFERENCE } from "../../../services/graphql/profile/queries";
import {
  selectUserId,
  setUserPreference,
  setUserPrompts,
  setUserPromptsOrder,
  setUserVisuals,
} from "../../../store/features/user/userSlice";

export const useFetchUserData = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  const { data: userPrompts } = useQuery(GET_USER_PROMPTS, {
    variables: {
      userId,
    },
  });

  useEffect(() => {
    if (userPrompts) {
      dispatch(setUserPrompts({ userPrompts: userPrompts.getUserPrompts }));
    }
  }, [userPrompts, dispatch]);

  const { data: userPromptData } = useQuery(GET_PROMPTS_ORDER, {
    variables: {
      userPromptsOrder: {
        userId,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (userPromptData) {
      dispatch(
        setUserPromptsOrder({
          userPrompts: userPromptData.getUserPromptsOrder,
        })
      );
    }
  }, [userPromptData, dispatch]);

  const { data: userPreferenceData } = useQuery(GET_USER_PREFERENCE, {
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

  useEffect(() => {
    const getVisuals = async () => {
      axios
        .get(`${URLS.FILE_URL}/api/v1/visuals/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        })
        .then((res) => {
          dispatch(
            setUserVisuals({
              userVisuals: res.data,
            })
          );
        })
        .catch(() => {});
    };
    getVisuals();
  }, [userId, dispatch]);

  return [];
};
