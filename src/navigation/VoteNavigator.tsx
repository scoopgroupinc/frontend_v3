import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenName } from "../utils/constants";
import { PromptVote } from "../containers/Votes/PromptVote";
import { VisualVote } from "../containers/Votes/VisualVote";
import { ProfileView } from "../containers/Votes/ProfileView";
import { MatchScreen } from "../containers/Votes/MatchScreen";
import { ComeBackTomorrow } from "../containers/Votes/ComeBackTomorrow";

const VoteStack = createStackNavigator();

const VoteNavigator = () => {
  return (
    <VoteStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <VoteStack.Screen name={screenName.PROMPT_VOTE} component={PromptVote} />
      <VoteStack.Screen name={screenName.VISUAL_VOTE} component={VisualVote} />
      <VoteStack.Screen
        name={screenName.PROFILE_VIEW}
        component={ProfileView}
      />
      <VoteStack.Screen name={screenName.MATCH_VIEW} component={MatchScreen} />
      <VoteStack.Screen
        name={screenName.COME_BACK_LATER}
        component={ComeBackTomorrow}
      />
    </VoteStack.Navigator>
  );
};
export default VoteNavigator;
