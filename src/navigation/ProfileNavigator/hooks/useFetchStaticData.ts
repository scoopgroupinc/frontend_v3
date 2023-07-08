import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { setAllPrompts, setAllTags } from "../../../store/features/prompts/promptsSlice";
import { GET_PROMPTS, GET_TAGS } from "../../../services/graphql/profile/queries";
import { useAppDispatch } from "../../../store/hooks";

export const useFetchStaticData = () => {
  const dispatch = useAppDispatch();
  const { data: promptsResult } = useQuery(GET_PROMPTS);
  const { data: tagsResult } = useQuery(GET_TAGS);

  useEffect(() => {
    if (promptsResult) {
      dispatch(setAllPrompts({ allPrompts: promptsResult.getPrompts }));
    }
  }, [promptsResult, dispatch]);

  useEffect(() => {
    if (tagsResult) {
      dispatch(setAllTags({ allTags: tagsResult.getTags }));
    }
  }, [tagsResult, dispatch]);

  return [];
};
