import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import { screenName } from "../utils/constants";
import { OnboardName } from "../containers/Onboarding/Name";
import { GenderScreen } from "../containers/Onboarding/Gender";
import { DateWhoScreen } from "../containers/Onboarding/DateWho";
import { OnboardBirthdayScreen } from "../containers/Onboarding/Birthday";
import { HeightScreen } from "../containers/Onboarding/Height";
import { PhotoVideoScreen } from "../containers/Onboarding/photoVideo";
import { QuestionPromptScreen } from "../containers/Onboarding/QuestionPrompt";
import AllPrompts from "../containers/Onboarding/Prompts";
import OnboardPromptAnswer from "../containers/Onboarding/PromptAnswer";

const OnboardStack = createNativeStackNavigator();

export const OnboardNavigator = () => {
  return (
    <OnboardStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnboardStack.Screen name={screenName.NAME} component={OnboardName} />
      <OnboardStack.Screen name={screenName.GENDER} component={GenderScreen} />
      <OnboardStack.Screen
        name={screenName.DATE_WHO}
        component={DateWhoScreen}
      />

      <OnboardStack.Screen
        name={screenName.BIRTHDAY}
        component={OnboardBirthdayScreen}
      />
      <OnboardStack.Screen name={screenName.HEIGHT} component={HeightScreen} />
      <OnboardStack.Screen
        name={screenName.PHOTOS}
        component={PhotoVideoScreen}
      />
      {/* <OnboardStack.Screen
        name={screenName.LOCATION}
        component={GetLocationsScreen}
      /> */}
      {/* <OnboardStack.Screen
        name={screenName.NOTIFICATIONS}
        component={SendNotificationScreen}
      /> */}
      <OnboardStack.Screen
        name={screenName.QUESTION_PROMPT}
        component={QuestionPromptScreen}
      />
      <OnboardStack.Screen
        name={screenName.ALLPROMPTS}
        component={AllPrompts}
      />
      <OnboardStack.Screen
        name={screenName.ONBOARD_PROMPT_ANSWER}
        component={OnboardPromptAnswer}
      />
    </OnboardStack.Navigator>
  );
};
