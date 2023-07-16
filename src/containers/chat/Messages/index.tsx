/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userSlice";
import { selectUserMatches } from "../../../store/features/matches/matchSlice";
import ChatHeader from "../../../components/atoms/ChatHeader";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { onScreenView } from "../../../analytics";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import { useGetUserConversations } from "../../../hooks/useGetUserConversations";

const ChatMessage = ({ route }: any) => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const userMatches = useAppSelector(selectUserMatches);

  const { matchUserId: receiverID, username, photo, msgs }: any = route.params;

  const [messages, setMessages] = useState<any>([]);
  const [, setIsFetchingUserConverstation] = useGetUserConversations(true);

  const socket: Socket = io("http://scoopchat-dev.eba-cqqr2rky.us-east-1.elasticbeanstalk.com", {
    transports: ["websocket", "polling"],
    upgrade: false,
    reconnectionAttempts: Infinity,
    extraHeaders: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  useOnScreenView({
    screenName: analyticScreenNames.messages,
    screenType: screenClass.chat
  });

  const renderBubble = (props: any) => {
    const messageSenderId = props.currentMessage.user._id;
    return (
      <Bubble
        {...props}
        position={messageSenderId.toString() === receiverID.toString() ? "left" : "right"}
        containerStyle={{
          right: {
            marginRight: 10,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "#d3d3d3",
            marginVertical: 5,
          },
          right: {
            marginVertical: 5,
          },
        }}
      />
    );
  }

  useEffect(() => {
    const getMessages = async () => {
      const modifiedMessage = msgs.map((message: any) => ({
        _id: message.id,
        text: message.content,
        createdAt: moment(message.createdAt).toISOString(),
        user: {
          _id: message.senderID === user?.userId ? +message.senderID : +receiverID,
          name: message.senderID === user?.userId ? user?.firstName : username,
        },
      }));
      setMessages([]);
      setMessages((previousMessages: any) => GiftedChat.append(previousMessages, modifiedMessage));
    };
    setInterval(() => {
      socket.emit("online", { userId: user?.userId, checkecUserId: receiverID });
    }, 18000);
    getMessages();
    onScreenView({
      screenName: analyticScreenNames.message,
      screenType: screenClass.chat,
    });
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (data.receiverID === user?.userId && data.senderID === data.userID) {
        setMessages((previousMessages: any) => [
          ...previousMessages,
          {
            _id: moment().toISOString(),
            text: data.content,
            createdAt: moment().toISOString(),
            user: {
              _id: receiverID,
              name: username,
            },
          },
        ]);
        setIsFetchingUserConverstation(true);
      }
    });
  }, [socket, receiverID, username, user?.userId, userMatches, dispatch]);

  const onSend = useCallback((message: any = []) => {
    const payload = {
      ...message,
      userID: message[0].user._id,
      name: message[0].user.name,
      receiverID: String(receiverID),
      content: message[0].text,
      createdAt: message[0].createdAt,
    };
    message[0].createdAt = moment().toISOString();
    socket.emit("addMessage", payload);
    setMessages((previousMessages: any) => GiftedChat.append(message, previousMessages));
    setIsFetchingUserConverstation(true);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatHeader username={username} photo={photo} />
      <GiftedChat
        scrollToBottom
        alwaysShowSend
        inverted={false}
        renderBubble={renderBubble}
        renderUsernameOnMessage={false}
        showUserAvatar={false}
        messages={messages}
        renderAvatar={() => null}
        onSend={(message) => onSend(message)}
        user={{
          _id: user?.userId,
          name: user?.firstName,
        }}
      />
    </SafeAreaView>
  );
};
export default ChatMessage;
