import moment from "moment";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import chatAxios from "../services/axios/chatAxios";
import { setMessages } from "../store/features/messages/MessagesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUserId } from "../store/features/user/userSlice";
import { selectUserChoices } from "../store/features/matches/matchSlice";

export const useGetUserConversations = (initialFetching = false) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const userChoices = useAppSelector(selectUserChoices);
  const [isFetching, setIsFetching] = useState(initialFetching);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsFetching(true);
      try {
        const results = await Promise.all(
          userChoices.map(async ({ matchName, matchUserId, visual }) => {
            const res = await chatAxios.get(`${matchUserId}?page=${1}`);
            return {
              matchUserId,
              name: matchName,
              photoUrl: visual.videoOrPhoto,
              lastActive: moment().subtract(3, "days").toISOString(),
              lstMessage: {
                text: res.data[res.data.length - 1]?.content.slice(0, 50).concat("..."),
                timestamp: res.data[res.data.length - 1]?.createdAt,
                myTurn: res.data[res.data.length - 1]?.receiverID === userId,
              },
              msgs: res.data,
            };
          })
        );
        const modifiedResults = results.sort(
          (a, b) => new Date(b.lstMessage.timestamp) - new Date(a.lstMessage.timestamp)
        );

        dispatch(
          setMessages({
            messages: modifiedResults,
          })
        );
      } catch (error) {
        Alert.alert("Chat Update Error", error.message);
      } finally {
        setIsFetching(false);
      }
    };

    if (isFetching) {
      fetchConversations();
    }
  }, [isFetching, dispatch, userId, userChoices]);

  return [isFetching, setIsFetching];
};
