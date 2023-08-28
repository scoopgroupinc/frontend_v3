import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { screenName } from "../utils/constants";
import RequestFeedbackSplash from "../containers/feedback/RequestFeedbackSplash";
import RequestFeedbackProfile from "../containers/feedback/RequestFeedbackProfile";
import { GET_USER_PROFILE_BY_LINK_ID } from "../services/graphql/user-link/queries";
import GoDeeper from "../containers/feedback/GoDeeper";
import FeedbackImpressions from "../containers/feedback/Impressions";

const FeedbackStack = createNativeStackNavigator();

const FeedbackNavigator = ({ route }: any) => {
  const { sharedLink } = route?.params?.link;
  const [profileData, setProfileData] = useState<any>(null);
  const { data } = useQuery(GET_USER_PROFILE_BY_LINK_ID, {
    variables: {
      id: sharedLink?.id,
    },
  });

  useEffect(() => {
    if (data === null) return;
    if (data?.getUserProfileByLinkId) {
      setProfileData(data.getUserProfileByLinkId);
    }
  }, [data, sharedLink]);

  return (
    <FeedbackStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenName.REQUEST_FEEDBACK_SPLASH_SCREEN}
    >
      <FeedbackStack.Screen
        name={screenName.REQUEST_FEEDBACK_SPLASH_SCREEN}
        component={RequestFeedbackSplash}
      />
      <FeedbackStack.Screen
        name={screenName.REQUEST_FEEDBACK_PROFILE}
        component={RequestFeedbackProfile}
        initialParams={{ profileData }}
      />
      <FeedbackStack.Screen name={screenName.GO_DEEPER} component={GoDeeper} />
      <FeedbackStack.Screen
        name={screenName.FEEDBACK_IMPRESSIONS}
        component={FeedbackImpressions}
      />
      {/* <FeedbackStack.Screen name={screenName.SHARE_FOR_FEEDBACK} component={ShareForFeedback} /> */}
      {/* <FeedbackStack.Screen name={screenName.USER_PROFILE_FEEDBACK} component={UserProfileFeedback} /> */}
    </FeedbackStack.Navigator>
  );
};
export default FeedbackNavigator;
