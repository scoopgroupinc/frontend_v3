import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { setAllPrompts } from "../../../store/features/prompts/promptsSlice";
import { GET_PROMPTS } from "../../../services/graphql/profile/queries";
import { useAppDispatch } from "../../../store/hooks";

export const useFetchStaticData = () => {

  const dispatch = useAppDispatch();
  const { data: promptsResult } = useQuery(GET_PROMPTS);

  useEffect(() => {
    if (promptsResult) {
      dispatch(setAllPrompts({ allPrompts: promptsResult.getPrompts }));
    }
  }, [promptsResult, dispatch]);


  return []
};