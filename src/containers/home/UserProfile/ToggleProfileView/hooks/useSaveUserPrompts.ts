import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  selectUserPrompts,
  selectIsUserPromptsDirty,
  selectUser,
  selectUserPromptsOrder,
} from "../../../../../store/features/user/userSlice";
import { useAppSelector } from "../../../../../store/hooks";
import { SAVE_USER_PROMPTS } from "../../../../../services/graphql/profile/mutations";

export const useSaveUserPrompts = () => {
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;
  const promptIds = useAppSelector(selectUserPromptsOrder);
  const userPrompts = useAppSelector(selectUserPrompts);
  const isUserPromptsDirty = useAppSelector(selectIsUserPromptsDirty);

  const [promptsToSave, setPromptsToSave] = useState([]);

  useEffect(() => {
    if (promptIds && userPrompts) {
      const prompts = [];
      (promptIds || []).forEach((id: string) => {
        const prompt = userPrompts[id];
        if (prompt) {
          prompts.push({
            answer: prompt.answer,
            promptId: prompt.promptId,
            userId,
          });
        }
      });
      setPromptsToSave(prompts);
    }
  }, [promptIds, userPrompts, userId]);

  const [saveUserPrompts] = useMutation(SAVE_USER_PROMPTS, {
    variables: {
      userPromptsInput: promptsToSave,
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return [!isUserPromptsDirty ? null : saveUserPrompts];
};
