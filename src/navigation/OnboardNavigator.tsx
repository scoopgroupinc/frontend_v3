import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { screenName } from "../utils/constants";
import { OnboardName } from "../containers/onboarding/Name";
import { GenderScreen } from "../containers/onboarding/Gender";
import { DateWhoScreen } from "../containers/onboarding/DateWho";
import { OnboardBirthdayScreen } from "../containers/onboarding/Birthday";
import { HeightScreen } from "../containers/onboarding/Height";
import { PhotoVideoScreen } from "../containers/onboarding/PhotoVideo";

import { QuestionPromptScreen } from "../containers/onboarding/QuestionPrompt";
import AllPrompts from "../features/Prompt/AllPrompts";
import OnboardPromptAnswer from "../containers/onboarding/PromptAnswer";
import ShareForFeedback from "../containers/onboarding/ShareForFeedback";

const OnboardStack = createNativeStackNavigator();

export const OnboardNavigator = () => (
  <OnboardStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <OnboardStack.Screen name={screenName.NAME} component={OnboardName} />
    <OnboardStack.Screen name={screenName.GENDER} component={GenderScreen} />
    <OnboardStack.Screen name={screenName.DATE_WHO} component={DateWhoScreen} />
    <OnboardStack.Screen name={screenName.BIRTHDAY} component={OnboardBirthdayScreen} />
    <OnboardStack.Screen name={screenName.HEIGHT} component={HeightScreen} />
    <OnboardStack.Screen name={screenName.PHOTOS} component={PhotoVideoScreen} />
    {/* <OnboardStack.Screen
        name={screenName.LOCATION}
        component={GetLocationsScreen}
      /> */}
    {/* <OnboardStack.Screen
        name={screenName.NOTIFICATIONS}
        component={SendNotificationScreen}
      /> */}
    <OnboardStack.Screen name={screenName.QUESTION_PROMPT} component={QuestionPromptScreen} />
    <OnboardStack.Screen name={screenName.ALLPROMPTS} component={AllPrompts} />
    <OnboardStack.Screen name={screenName.PROMPT_ANSWER} component={OnboardPromptAnswer} />
    <OnboardStack.Screen name={screenName.SHARE_FOR_FEEDBACK} component={ShareForFeedback} />
  </OnboardStack.Navigator>
);
