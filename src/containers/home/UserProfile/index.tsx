import React, { useEffect } from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { Colors } from "../../../utils";
import { screenName } from "../../../utils/constants";
import { UserProfileEdit } from "../UserProfileEdit";
import School from "./School";
import JobTitle from "./JobTitle";
import EducationLevel from "./EducationLevel";
import Hometown from "./Hometown";
import Company from "./Company";
import Prompts from "./Prompts";
import PromptAnswer from "./PromptAnswer";
import Ethnicity from "./Ethnicity";
import Sports from "./Sports";
import Smoking from "./Smoking";
import Cannabis from "./Cannabis";
import Alcohol from "./Alcohol";
import Drugs from "./Drugs";
import Diet from "./Diet";
import Languages from "./Languages";
import MusicGenre from "./MusicGenre";
import CreativeOulet from "./CreativeOulet";
import Religions from "./Religions";
import ReligiousPractices from "./ReligiousPractices";
import Zodiac from "./Zodiac";
import MeyerBriggs from "./MeyerBriggs";
import Politics from "./Politics";
import ParentingGoals from "./ParentingGoals";
import RelationshipGoals from "./RelationshipGoals";
import RelationshipTypes from "./RelationshipTypes";
import Pets from "./Pets";
import BookGenre from "./BookGenre";
import StayingIn from "./StayingIn";
import GoingOut from "./GoingOut";
import Drink from "./Drink";
import { UserProfileView } from "../UserProfileView";

const Tab = createMaterialTopTabNavigator();
const UserProfileStack = createNativeStackNavigator();

const TopTab = () => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  useEffect(() => {
    // onScreenView({
    //   screenName: screenNames.profile,
    //   screenType: screenClass.profile,
    // });
  }, []);

  return (
    <LinearGradient style={{ flex: 1 }} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: Colors.WHITE,
              height: 3,
              width: 100,
              left: (Dimensions.get("window").width / 2 - 100) / 2,
            },
            tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
            tabBarStyle: { backgroundColor: "transparent" },
          }}
        >
          <Tab.Screen name="Edit" component={UserProfileEdit} />
          <Tab.Screen name="View" component={UserProfileView} />
        </Tab.Navigator>
      </SafeAreaView>
    </LinearGradient>
  );
}

const UserProfile = () => (
    <UserProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <UserProfileStack.Screen name="TopTab" component={TopTab} />
      <UserProfileStack.Group>
        <UserProfileStack.Screen name={screenName.JOB_TITLE} component={JobTitle} />
        <UserProfileStack.Screen name={screenName.SCHOOL} component={School} />
        <UserProfileStack.Screen name={screenName.EDUCATION_LEVEL} component={EducationLevel} />
        <UserProfileStack.Screen name={screenName.HOMETOWN} component={Hometown} />
        <UserProfileStack.Screen name={screenName.COMPANY} component={Company} />

        <UserProfileStack.Screen name={screenName.ETHNICITY} component={Ethnicity} />
        <UserProfileStack.Screen name={screenName.SPORTS} component={Sports} />
        <UserProfileStack.Screen name={screenName.SMOKING} component={Smoking} />
        <UserProfileStack.Screen name={screenName.CANNABIS} component={Cannabis} />
        <UserProfileStack.Screen name={screenName.ALCOHOL} component={Alcohol} />
        <UserProfileStack.Screen name={screenName.DRUGS} component={Drugs} />
        <UserProfileStack.Screen name={screenName.DIET} component={Diet} />
        <UserProfileStack.Screen name={screenName.LANGUAGES} component={Languages} />
        <UserProfileStack.Screen name={screenName.MUSIC_GENRES} component={MusicGenre} />
        <UserProfileStack.Screen name={screenName.CREATIVE_OUTLET} component={CreativeOulet} />
        <UserProfileStack.Screen name={screenName.RELIGIONS} component={Religions} />
        <UserProfileStack.Screen
          name={screenName.RELIGIOUS_PRACTICES}
          component={ReligiousPractices}
        />
        <UserProfileStack.Screen name={screenName.ZODIAC} component={Zodiac} />
        <UserProfileStack.Screen name={screenName.MEYER_BRIGGS} component={MeyerBriggs} />
        <UserProfileStack.Screen name={screenName.POLITICS} component={Politics} />
        <UserProfileStack.Screen name={screenName.PARENTING_GOALS} component={ParentingGoals} />
        <UserProfileStack.Screen
          name={screenName.RELATIONSHIP_GOALS}
          component={RelationshipGoals}
        />
        <UserProfileStack.Screen
          name={screenName.RELATIONSHIP_TYPES}
          component={RelationshipTypes}
        />
        <UserProfileStack.Screen name={screenName.PETS} component={Pets} />
        <UserProfileStack.Screen name={screenName.BOOK_GENRES} component={BookGenre} />
        <UserProfileStack.Screen name={screenName.STAYING_IN} component={StayingIn} />
        <UserProfileStack.Screen name={screenName.GOING_OUT} component={GoingOut} />
        <UserProfileStack.Screen name={screenName.DRINK} component={Drink} />
      </UserProfileStack.Group>

      <UserProfileStack.Screen name={screenName.ALLPROMPTS} component={Prompts} />

      <UserProfileStack.Screen name={screenName.ONBOARD_PROMPT_ANSWER} component={PromptAnswer} />
    </UserProfileStack.Navigator>
  )

export default UserProfile;
