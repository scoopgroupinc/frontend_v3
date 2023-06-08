/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { List } from "react-native-paper";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userSlice";
import { selectUserMatches } from "../../../store/features/matches/matchSlice";
import Badge from "../../../components/atoms/Badge";
import styles from "./styles";
import chatAxios from "../../../services/axios/chatAxios";
import { selectMessages, setMessages } from "../../../store/features/messages/MessagesSlice";
import { screenName } from "../../../utils/constants";

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

const Conversations = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userId = user?.userId;
  const userMatches = useAppSelector(selectUserMatches);

  const chatUsers = useAppSelector(selectMessages);

  useEffect(() => {
    getUserConversationList(userMatches, dispatch, userId);
    // onScreenView({
    //   screenName: screenNames.chatList,
    //   screenType: screenClass.chat,
    // });
  }, [userMatches, dispatch, userId]);

  const onPressChat = (matchUserId: string, username: string, photo: string, msgs: any) => {
    navigation.navigate(screenName.MESSAGES, {
      matchUserId,
      username,
      photo,
      msgs,
    });
  };

  const renderItem = (item: any) => (
    <List.Item
      style={styles.content}
      key={item.matchUserId}
      onPress={() =>
        onPressChat(
          item.matchUserId,
          item.name,
          item.photoUrl ? item.photoUrl : require("../../../assets/images/logo-small.png"),
          item.mgs
        )
      }
      title={item.name}
      description={item.lstMessage.text}
      left={() => (
        <Image
          resizeMode="cover"
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={{
            uri: item.photoUrl ? item.photoUrl : require("../../../assets/images/logo-small.png"),
          }}
        />
      )}
      right={() => (
        <View>
          <Text style={styles.lastActive}>{moment(item.lstMessage.timestamp).fromNow()}</Text>
          {item.lstMessage.myTurn === true ? (
            <View style={{ alignSelf: "flex-end" }}>
              <Badge value="Your turn" />
            </View>
          ) : null}
        </View>
      )}
    />
  );

  return <View>{chatUsers?.map((user: any) => renderItem(user))}</View>;
};

export default Conversations;
