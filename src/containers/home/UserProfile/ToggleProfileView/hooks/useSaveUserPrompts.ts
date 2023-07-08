import { useMutation } from "@apollo/client";
import {
  selectUserPrompts,
  selectisUserPromptsDirty,
  selectUser,
} from "../../../../../store/features/user/userSlice";
import { useAppSelector } from "../../../../../store/hooks";
import {
  SAVE_USER_PROMPT_ORDER,
  SAVE_USER_PROMPTS,
} from "../../../../../services/graphql/profile/mutations";

export const useSaveUserPrompts = () => {
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;
  const userPrompts = useAppSelector(selectUserPrompts);
  const isUserPromptsDirty = useAppSelector(selectisUserPromptsDirty);

  const [saveUserPromptsOrder] = useMutation(SAVE_USER_PROMPT_ORDER);

  const [saveUserPrompts] = useMutation(SAVE_USER_PROMPTS, {
    variables: {
      UserPromptInput: userPrompts
        .filter((item: any) => item.answer !== "")
        .map((item: any) => ({
          answer: item.answer,
          promptId: item.promptId,
          userId,
        })),
    },
    onCompleted: async (data) => {
      const { saveUserPrompts: prompts } = data;
      if (prompts.length > 0) {
        // get the ids of prompts in items
        const ids: string[] = userPrompts.map((item: any) => item.id);

        prompts.forEach((item: any, index: number) => {
          if (item.id !== ids[index]) {
            ids[index] = item.id;
          }
        });

        saveUserPromptsOrder({
          variables: {
            UserPromptsOrder: {
              userId,
              userPromptIds: ids,
            },
          },
        });
      }
    },
  });

  return [!isUserPromptsDirty ? null : saveUserPrompts];
};
