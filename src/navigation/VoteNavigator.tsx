import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenName } from "../utils/constants";
import { PromptVote } from "../containers/votes/PromptVote";
import { VisualVote } from "../containers/votes/VisualVote";
import { ProfileView } from "../containers/votes/ProfileView";
import { MatchScreen } from "../containers/votes/MatchScreen";
import { ComeBackTomorrow } from "../containers/votes/ComeBackTomorrow";
import { useAppSelector } from "../store/hooks";
import { selectUserChoices } from "../store/features/matches/matchSlice";

const VoteStack = createStackNavigator();

const VoteNavigator = () => {
  const userChoices = useAppSelector(selectUserChoices);
  if (userChoices.length === 0) {
    return <ComeBackTomorrow noMatchToday />;
  }

  return (
    <VoteStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenName.PROMPT_VOTE}
    >
      <VoteStack.Screen name={screenName.PROMPT_VOTE} component={PromptVote} />
      <VoteStack.Screen name={screenName.VISUAL_VOTE} component={VisualVote} />
      <VoteStack.Screen name={screenName.PROFILE_VIEW} component={ProfileView} />
      <VoteStack.Screen name={screenName.MATCH_VIEW} component={MatchScreen} />
      <VoteStack.Screen name={screenName.COME_BACK_LATER} component={ComeBackTomorrow} />
    </VoteStack.Navigator>
  );
}
export default VoteNavigator;
