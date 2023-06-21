import cloneDeep from "lodash.clonedeep";
import moment from "moment";
import chatAxios from "../services/axios/chatAxios";
import { setMessages } from "../store/features/messages/MessagesSlice";

export const getUserConversationList = async (userChoices: any, dispatch: any, userId: string) => {
  try {
    const results: any = [];
    await Promise.all(
      userChoices.map(async ({ matchName, matchUserId, visual }: any) => {
        await chatAxios
          .get(`${matchUserId}?page=${1}`)
          .then((res: any) => {
            results.push({
              matchUserId,
              name: matchName,
              photoUrl: visual.videoOrPhoto,
              lastActive: moment().subtract(3, "days").toISOString(),
              lstMessage: {
                text: res.data[res.data.length - 1]?.content.slice(0, 50).concat("..."),
                timestamp: res.data[res.data.length - 1]?.createdAt,
                myTurn: res.data[res.data.length - 1]?.receiverID === userId,
              },
              mgs: res.data,
            });
          })
          .catch(() => {
            /* empty */
          });
      })
    );
    const modifiedResults = results.sort(
      (a: any, b: any) => new Date(b.lstMessage.timestamp) - new Date(a.lstMessage.timestamp)
    );

    dispatch(
      setMessages({
        messages: modifiedResults,
      })
    );
  } catch (error) {
    /* empty */
  }
};

export const cloneArray = (array: any[]) => {
  if (array) {
    return cloneDeep(array);
  }
  return [];
};

export const mapIndexToUserVisuals = (d: any, index: number, arr: any[]) => ({
  id: `${index}`,
  createdAt: "",
  userId: "",
  videoOrPhoto: "",
  visualPromptId: "",
  deletedAt: "",
  description: "",
  order: "",
  isVisible: true,
});

export const mapIndexToPrompts = (d: any, index: number, arr: any[]) => ({
  id: `${index}`,
  userId: "",
  promptId: "",
  prompt: "",
  answer: "",
});

export type Item = ReturnType<typeof mapIndexToPrompts>;
export type UserVisualsType = ReturnType<typeof mapIndexToUserVisuals>;
