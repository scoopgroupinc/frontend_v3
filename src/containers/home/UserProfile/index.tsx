import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenName } from "../../../utils/constants";
import School from "./School";
import JobTitle from "./JobTitle";
import EducationLevel from "./EducationLevel";
import Hometown from "./Hometown";
import Company from "./Company";
import AllPrompts from "../../../features/Prompt/AllPrompts";
import EditPromptAnswer from "./EditPromptAnswer";
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
import { ToggleProfileView } from "./ToggleProfileView";
import { AddressScreen } from "./City";

const UserProfileStack = createNativeStackNavigator();

const UserProfile = () => (
  <UserProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <UserProfileStack.Screen name={screenName.TOGGLE_PROFILE_VIEW} component={ToggleProfileView} />
    <UserProfileStack.Group>
      <UserProfileStack.Screen name={screenName.JOB_TITLE} component={JobTitle} />
      <UserProfileStack.Screen name={screenName.SCHOOL} component={School} />
      <UserProfileStack.Screen name={screenName.EDUCATION_LEVEL} component={EducationLevel} />
      <UserProfileStack.Screen name={screenName.HOMETOWN} component={Hometown} />
      <UserProfileStack.Screen name={screenName.COMPANY} component={Company} />

      <UserProfileStack.Screen name={screenName.ETHNICITY} component={Ethnicity} />
      <UserProfileStack.Screen name={screenName.PHYSICAL_ACTIVITY} component={Sports} />
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
      <UserProfileStack.Screen name={screenName.RELATIONSHIP_GOALS} component={RelationshipGoals} />
      <UserProfileStack.Screen name={screenName.RELATIONSHIP_TYPES} component={RelationshipTypes} />
      <UserProfileStack.Screen name={screenName.PETS} component={Pets} />
      <UserProfileStack.Screen name={screenName.BOOK_GENRES} component={BookGenre} />
      <UserProfileStack.Screen name={screenName.STAYING_IN} component={StayingIn} />
      <UserProfileStack.Screen name={screenName.GOING_OUT} component={GoingOut} />
      <UserProfileStack.Screen name={screenName.DRINK} component={Drink} />
      <UserProfileStack.Screen name={screenName.ADDRESS} component={AddressScreen} />
    </UserProfileStack.Group>

    <UserProfileStack.Screen name={screenName.ALLPROMPTS} component={AllPrompts} />

    <UserProfileStack.Screen name={screenName.PROMPT_ANSWER} component={EditPromptAnswer} />
  </UserProfileStack.Navigator>
);
export default UserProfile;
