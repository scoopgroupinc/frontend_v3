import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { List } from "react-native-paper";
import moment from "moment";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import chatAxios from "../../../services/axios/chatAxios";
import { selectMessages, setMessages } from "../../../store/features/messages/messagesSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userProfileSlice";
import { selectUserChoices } from "../../../store/features/user/userChoicesSlice";
import { setUserMatches } from "../../../store/features/user/userMatchesSlice";
import Badge from "../../../components/atoms/Badge";
import { GET_USER_CHOICES } from "../../../services/graphql/profile/queries";
import { IS_USER_BLOCKED } from "../../../services/graphql/chat/queries";
import { screenName } from "../../../utils/constants";
// TODO: add analytics
// import { onScreenView } from '../../../analytics'
// import { screenClass, screenNames } from '../../../analytics/constants'
import { styles } from "./styles";

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
          .catch((err: any) => {});
      })
    );
    // sort results by last message timestamp
    const modifiedResults = results.sort((a: any, b: any) => new Date(b.lstMessage.timestamp) - new Date(a.lstMessage.timestamp));
    dispatch(
      setMessages({
        messages: modifiedResults,
      })
    );
  } catch (error) {}
};

const Conversations = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector(selectUser);
  const { userId } = reduxUser || { userId: null };
  const userChoices = useAppSelector(selectUserChoices);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const chatUsers = useAppSelector(selectMessages);
  const [isUserBlocked, { data: nonBlockedUsers }] = useLazyQuery(IS_USER_BLOCKED);

  const { data: userChoicesResult, loading: userChoicesLoading } = useQuery(GET_USER_CHOICES, {
    variables: {
      userId,
    },
    onCompleted: (data) => {
      dispatch(
        setUserMatches({
          userMatches: userChoicesResult.getUserChoices,
        })
      );
    },
    onError: (error) => {},
  });

  // useEffect(() => {
  //   getUserConversationList(userChoices, dispatch, userId)
  //   onScreenView({
  //     screenName:screenNames.chatList,
  //     screenType:screenClass.chat
  //   })
  // }, [userChoices])

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
        left={(props) => (
          <Image
            resizeMode="cover"
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: item.photoUrl ? item.photoUrl : require("../../../assets/images/logo-small.png"),
            }}
          />
        )}
        right={(props) => (
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

  return <View />;
}

export default Conversations;
