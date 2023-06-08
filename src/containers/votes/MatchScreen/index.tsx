import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { Socket, io } from "socket.io-client";
import styles from "./styles";
import { selectUser } from "../../../store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Colors, Spacing } from "../../../utils";
import LikeButton from "../../../components/atoms/LikeButton";
import { AppButton } from "../../../components/atoms/AppButton";
import { screenName } from "../../../utils/constants";
import {
  RemoveActiveChoice,
  selectMatchedUsers,
  selectUserChoices,
} from "../../../store/features/matches/matchSlice";

const MatchScreen = () => {
  const { user } = useAppSelector(selectUser);

  const socket: Socket = io("http://scoopchat-dev.eba-cqqr2rky.us-east-1.elasticbeanstalk.com", {
    transports: ["websocket", "polling"],
    upgrade: false,
    reconnectionAttempts: Infinity,
    extraHeaders: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  console.log("socket", socket);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const dispatch = useAppDispatch();
  const userChoices = useAppSelector(selectUserChoices);

  const matchedUsers = useAppSelector(selectMatchedUsers);
  const [user1, user2] = matchedUsers;
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const [msg, setMsg] = useState<string>("");

  // const matchedUsers = useAppSelector(selectMatchedUsers);

  const sendChatMessage = () => {
    const payload = {
      userID: user1.userId,
      receiverID: user2.userId,
      content: msg,
      createdAt: moment().toISOString(),
    };
    socket.emit("addMessage", payload);
    dispatch(
      RemoveActiveChoice({
        activeChoiceId: userChoices[0].id,
      })
    );
    navigation.navigate(screenName.CHAT_NAVIGATOR);

    //  logEvent({
    //    eventName: eventNames.submitConversationStarterButton,
    //    params: {
    //      userId: reduxUser?.userId,
    //      screenClass: screenClass.matches,
    //    },
    //  });
  };

  return (
    <LinearGradient style={{ flex: 1 }} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={handleClose} style={styles.closeIcon}>
            <MaterialIcons name='close' size={42} color={Colors.WHITE} />
          </TouchableOpacity> */}
          <View
            style={{
              alignItems: "center",
              flex: 1,
              marginTop: 140,
              marginBottom: 60,
            }}
          >
            <Text style={styles.text}>{`It's a match!`}</Text>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{
                  uri: user1?.pic,
                }}
              />
              <Image
                style={styles.image}
                source={{
                  uri: user2?.pic,
                }}
              />
              <View style={styles.match}>
                <LikeButton width={90} height={90} />
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              paddingHorizontal: 20,
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.label}>Initiate a conversation</Text>
            <View style={{ marginTop: Spacing.SCALE_8, marginBottom: Spacing.SCALE_12 }}>
              <TextInput value={msg} onChangeText={(e) => setMsg(e)} style={[styles.input]} />
            </View>
            <AppButton isDisabled={msg.length === 0} onPress={sendChatMessage}>
              Submit
            </AppButton>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MatchScreen;
