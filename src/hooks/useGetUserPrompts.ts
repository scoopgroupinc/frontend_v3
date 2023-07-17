import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_USER_PROMPTS } from "../services/graphql/onboarding/queries";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { GET_PROMPTS_ORDER } from "../services/graphql/profile/queries";
import {
  selectUserId,
  setUserPrompts,
  setUserPromptsOrder,
} from "../store/features/user/userSlice";
import { GetPromptsOrderType, PromptsOrder } from "../utils/types";

export const useGetUserPrompts = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectUserId);

  // user prompts data
  const {
    data: userPrompts,
    loading: loadingPrompts,
    error,
  } = useQuery(GET_USER_PROMPTS, {
    variables: {
      userId,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!loadingPrompts && userPrompts) {
      dispatch(setUserPrompts({ userPrompts: userPrompts.getUserPrompts }));
    }
  }, [userPrompts, loadingPrompts, dispatch]);

  // user prompts order data
  const { loading: loadingPromptOrder, data: userPromptData } = useQuery(GET_PROMPTS_ORDER, {
    variables: {
      userPromptsOrder: {
        userId,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (!loadingPromptOrder && userPromptData) {
      // const ratingInput: any = []
      // promptsOrder.forEach((prompt: any) => {
      //   const find = contentIds.find(
      //     (rd: any) => rd.contentId === prompt.id && rd.type === 'user_visual'
      //   )
      //   if (!find) {
      //     ratingInput.push({
      //       contentId: prompt.id,
      //       type: 'prompt',
      //     })
      //   }
      // })
      // setContentIds((prev: any) => [...prev, ...ratingInput])
      dispatch(
        setUserPromptsOrder({
          userPrompts: userPromptData.getUserPromptsOrder,
        })
      );
    }
  }, [userPromptData, loadingPromptOrder, dispatch]);

  return  {
    data: userPrompts,
    loading: loadingPrompts,
    error,
  };
};
