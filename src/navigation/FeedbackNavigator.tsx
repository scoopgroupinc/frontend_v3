import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { screenName } from "../utils/constants";
import RequestFeedbackSplash from "../containers/feedback/RequestFeedbackSplash";
import RequestFeedbackProfile from "../containers/feedback/RequestFeedbackProfile";
import GoDeeper from "../containers/feedback/GoDeeper";
import FeedbackImpressions from "../containers/feedback/Impressions";
import { useAppDispatch } from "../store/hooks";
import { setFeedbackUser } from "../store/features/feedback/feedbackSlice";
import AuthorizedFeedbackUser from "../containers/feedback/AuthorizedFeedbackUser";
import { GET_USER_PROFILE_BY_LINK_ID } from "../services/graphql/user-link/mutations";

const FeedbackStack = createNativeStackNavigator();

const FeedbackNavigator = ({ route }: any) => {
  const { sharedLink } = route.params.link;
  const [loadLink] = useMutation(GET_USER_PROFILE_BY_LINK_ID, {
    variables: {
      id: sharedLink?.id,
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (sharedLink?.id) {
      loadLink().then((res) => {
        if (res?.data?.getUserProfileByLinkId) {
          dispatch(
            setFeedbackUser({
              feedbackUser: res?.data?.getUserProfileByLinkId,
            })
          );
        }
      });
    }
  }, [sharedLink, loadLink, dispatch]);

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
      />
      <FeedbackStack.Screen name={screenName.GO_DEEPER} component={GoDeeper} />
      <FeedbackStack.Screen
        name={screenName.FEEDBACK_IMPRESSIONS}
        component={FeedbackImpressions}
      />
      <FeedbackStack.Screen
        name={screenName.AUTHORIZEDFEEDBACKUSER}
        component={AuthorizedFeedbackUser}
      />
      {/* <FeedbackStack.Screen name={screenName.SHARE_FOR_FEEDBACK} component={ShareForFeedback} /> */}
      {/* <FeedbackStack.Screen name={screenName.USER_PROFILE_FEEDBACK} component={UserProfileFeedback} /> */}
    </FeedbackStack.Navigator>
  );
};
export default FeedbackNavigator;
