import React, { useState, useCallback, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import { io, Socket } from "socket.io-client";
import ChatHeader from "../../../components/atoms/ChatHeader";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userProfileSlice";
import { getUserConversationList } from "../Conversations";
import { selectUserChoices } from "../../../store/features/user/userChoicesSlice";
// TODO: add analytics
// import { onScreenView } from '../../../analytics'
// import { screenClass, screenNames } from '../../../analytics/constants'

const ChatMessage = ({ route, navigation }: any) => {
  const reduxUser = useAppSelector(selectUser);
  const { userId, firstName, token } = reduxUser;
  const dispatch = useAppDispatch();
  const userChoices = useAppSelector(selectUserChoices);

  const { matchUserId: receiverID, username, photo, msgs }: any = route.params;

  const [messages, setMessages] = useState<any>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isOnline, setOnline] = useState<string>("");

  const renderBubble = (props: any) => {
    const message_sender_id = props.currentMessage.user._id;
    return (
      <Bubble
        {...props}
        position={message_sender_id == receiverID ? "left" : "right"}
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
  };

  useEffect(() => {
    const getMessages = async () => {
      const modifiedMessage = msgs.map((message: any) => ({
          _id: message.id,
          text: message.content,
          createdAt: moment(message.createdAt).toISOString(),
          user: {
            _id: message.senderID == userId ? +message.senderID : +receiverID,
            name: message.senderID == userId ? firstName : username,
          },
        }));
      setMessages([]);
      setMessages((previousMessages: any) => GiftedChat.append(previousMessages, modifiedMessage));
    };

    socket.on("isTyping", ({ typing, userID }) => {
      if (userID === userId) setIsTyping(typing);
    });
    socket.on("isOnline", (data) => {
      setOnline(data ? "online" : "");
    });
    setInterval(() => {
      socket.emit("online", { userId, checkecUserId: receiverID });
    }, 18000);
    getMessages();
    // onScreenView({
    //   screenName:screenNames.message,
    //   screenType:screenClass.chat
    // })
  }, []);

  const socket: Socket = io("http://scoopchat-dev.eba-cqqr2rky.us-east-1.elasticbeanstalk.com", {
    transports: ["websocket", "polling"],
    upgrade: false,
    reconnectionAttempts: Infinity,
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (data.receiverID === userId && data.senderID === receiverID) {
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
        getUserConversationList(userChoices, dispatch, userId);
      }
    });
  }, [socket]);

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
    getUserConversationList(userChoices, dispatch);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top", "bottom"]}>
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
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: userId,
          name: firstName,
        }}
      />
    </SafeAreaView>
  );
}
export default ChatMessage;
