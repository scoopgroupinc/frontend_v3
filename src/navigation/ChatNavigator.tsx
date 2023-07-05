/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { screenName } from "../utils/constants";
import Conversations from "../containers/chat/Conversations";
import { GET_USER_MATCHES } from "../services/graphql/chat/queries";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUserMatches } from "../store/features/matches/matchSlice";
import { selectUser } from "../store/features/user/userSlice";


const ChatStack = createNativeStackNavigator();

const ChatNavigator = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const { data: userMatchesData, refetch: userMatchesRefetch } = useQuery(GET_USER_MATCHES, {
    variables: {
      userId: user?.userId,
    },
  });

  const componentDidMount = () => {
    userMatchesRefetch();
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  useEffect(() => {
    if (userMatchesData) {
      dispatch(
        setUserMatches({
          userMatches: userMatchesData.getUserMatches,
        })
      );
    }
  }, [userMatchesData, dispatch]);

  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenName.CONVERSATIONS}
    >
      <ChatStack.Screen
        options={{
          headerShown: true,
        }}
        name={screenName.CONVERSATIONS}
        component={Conversations}
      />
    </ChatStack.Navigator>
  );
};

export default ChatNavigator;
