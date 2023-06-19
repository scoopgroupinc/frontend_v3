import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";
import { Spacing } from "../../../utils";

const getJobDetails = (userProfile: any) => {
  const company = userProfile?.find((item: any) => item.tagType === "company");
  const companyString = company?.userTags[0]?.tagName ? `@ ${company?.userTags[0]?.tagName}` : "";
  const job = userProfile?.find((item: any) => item.tagType === "job");
  const jobString = job?.userTags[0]?.tagName ? `${job?.userTags[0]?.tagName} ` : "";
  if (job?.userTags[0]?.tagName !== "" && job?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userProfile?.find((item: any) => item.tagType === "job")?.emoji} {jobString}
        {companyString}
      </Text>
    );
  }
};

const getSchoolDetails = (userProfile: any) => {
  const schoolName = userProfile?.find((item: any) => item.tagType === "school")?.userTags[0]
    ?.tagName;
  const school = userProfile?.find((item: any) => item.tagType === "school");
  if (school?.visible && schoolName)
    return (
      <Text style={[styles.descriptionText]}>
        {school?.emoji} {schoolName}
      </Text>
    );
};

const getLanguagesDetails = (userProfile: any) => {
  const languages = userProfile?.find((item: any) => item.tagType === "language");
  if (languages?.userTags.length > 0 && languages?.visible) {
    return (
      <View>
        <View style={styles.section}>
          <Text style={styles.descriptionHeader}>Languages I know</Text>
          <Text style={[styles.descriptionText]}>
            {userProfile?.find((item: any) => item.tagType === "language")?.emoji}&nbsp;
            {languages?.userTags.map((item: any, index: any) => (
              <Text key={index}>
                {item.tagName}
                {index === languages.userTags.length - 1 ? "" : ", "}
              </Text>
            ))}
          </Text>
        </View>
      </View>
    );
  }
};

const getMusicGenreDetails = (userProfile: any) => {
  const music = userProfile?.find((item: any) => item.tagType === "music_genre");
  if (music?.userTags.length > 0 && music?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userProfile?.find((item: any) => item.tagType === "music_genre")?.emoji}&nbsp;
        {music?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === music.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
};

const getBookGenreDetails = (userProfile: any) => {
  const book = userProfile?.find((item: any) => item.tagType === "book_genre");
  if (book?.userTags.length > 0 && book?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userProfile?.find((item: any) => item.tagType === "book_genre")?.emoji}&nbsp;
        {book?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === book.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
};

const getPetsDetails = (userProfile: any) => {
  const pets = userProfile?.find((item: any) => item.tagType === "pets");
  if (pets?.userTags.length > 0 && pets?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userProfile?.find((item: any) => item.tagType === "pets")?.emoji}&nbsp;
        {pets?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === pets.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
};

const getSportsDetails = (userProfile: any) => {
  const sports = userProfile?.find((item: any) => item.tagType === "physical_activity");
  if (sports?.userTags.length > 0 && sports?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userProfile?.find((item: any) => item.tagType === "physical_activity")?.emoji}&nbsp;
        {sports?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === sports.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
};

const getGoingOutDetails = (userProfile: any) => {
  const goingOut = userProfile?.find((item: any) => item.tagType === "going_out");
  if (goingOut?.userTags.length > 0 && goingOut?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userProfile?.find((item: any) => item.tagType === "going_out")?.emoji}&nbsp;
        {goingOut?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === goingOut.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
};

const getCreativeOuletDetails = (userProfile: any) => {
  const creative = userProfile?.find((item: any) => item.tagType === "creative");
  if (creative?.userTags.length > 0 && creative?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userProfile?.find((item: any) => item.tagType === "creative")?.emoji}&nbsp;
        {creative?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === creative.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
};

const getStayingInDetails = (userProfile: any) => {
  const stayingIn = userProfile?.find((item: any) => item.tagType === "staying_in");
  if (stayingIn?.userTags.length > 0 && stayingIn?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userProfile?.find((item: any) => item.tagType === "staying_in")?.emoji}&nbsp;
        {stayingIn?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === stayingIn.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
};

const getDrinkDetails = (userProfile: any) => {
  const drink = userProfile?.find((item: any) => item.tagType === "drink");
  if (drink?.userTags.length > 0 && drink?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userProfile?.find((item: any) => item.tagType === "drink")?.emoji}&nbsp;
        {drink?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === drink.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
};

const getPoliticsDetails = (userProfile: any) => {
  const politics = userProfile?.find((item: any) => item.tagType === "politics");
  const politicsName = politics?.userTags[0]?.tagName;
  if (politics?.visible && politicsName) {
    return (
      <Text style={[styles.descriptionText]}>
        {politics?.emoji} {politicsName}
      </Text>
    );
  }
};

const getAlcoholDetails = (userProfile: any) => {
  const alcohol = userProfile?.find((item: any) => item.tagType === "alcohol");
  const alcoholName = alcohol?.userTags[0]?.tagName;
  if (alcohol?.visible && alcoholName) {
    return (
      <Text style={[styles.descriptionText]}>
        {alcohol?.emoji} {alcoholName}
      </Text>
    );
  }
};

const getSmokingDetails = (userProfile: any) => {
  const smoking = userProfile?.find((item: any) => item.tagType === "smoking");
  const smokingName = smoking?.userTags[0]?.tagName;
  if (smoking?.visible && smokingName) {
    return (
      <Text style={[styles.descriptionText]}>
        {smoking?.emoji} {smokingName}
      </Text>
    );
  }
};

const getDrugsDetails = (userProfile: any) => {
  const drug = userProfile?.find((item: any) => item.tagType === "drug_usage");
  const drugName = drug?.userTags[0]?.tagName;
  if (drug?.visible && drugName) {
    return (
      <Text style={[styles.descriptionText]}>
        {drug?.emoji} {drugName}
      </Text>
    );
  }
};

const getZodiacDetails = (userProfile: any) => {
  const zodiac = userProfile?.find((item: any) => item.tagType === "zodiac");
  const zodiacName = zodiac?.userTags[0]?.tagName;
  if (zodiac?.visible && zodiacName) {
    return (
      <Text style={[styles.descriptionText]}>
        {zodiac?.emoji} {zodiacName}
      </Text>
    );
  }
};

const getMeyerBriggsDetails = (userProfile: any) => {
  const meyerBriggs = userProfile?.find((item: any) => item.tagType === "meyer_briggs");
  const meyerBriggsName = meyerBriggs?.userTags[0]?.tagName;
  if (meyerBriggs?.visible && meyerBriggsName) {
    return (
      <Text style={[styles.descriptionText]}>
        {meyerBriggs?.emoji} {meyerBriggsName}
      </Text>
    );
  }
};

const getParentingGoalDetails = (userProfile: any) => {
  const parentingGoal = userProfile?.find((item: any) => item.tagType === "parenting_goal");
  const parentingGoalName = parentingGoal?.userTags[0]?.tagName;
  if (parentingGoal?.visible && parentingGoalName) {
    return (
      <Text style={[styles.descriptionText]}>
        {parentingGoal?.emoji} {parentingGoalName}
      </Text>
    );
  }
};

const getEducationLevelDetails = (userProfile: any) => {
  const education = userProfile?.find((item: any) => item.tagType === "education");
  const educationName = education?.userTags[0]?.tagName;
  if (education?.visible && educationName) {
    return (
      <Text style={[styles.descriptionText, { fontSize: Spacing.SCALE_14 }]}>
        {education?.emoji} {educationName}
      </Text>
    );
  }
};

const getHometownDetails = (userProfile: any) => {
  const hometown = userProfile?.find((item: any) => item.tagType === "homeTown");
  const hometownName = hometown?.userTags[0]?.tagName;
  if (hometown?.visible && hometownName)
    return (
      <Text style={[styles.descriptionText]}>
        {hometown?.emoji} {hometownName}
      </Text>
    );
};

const getDietDetails = (userProfile: any) => {
  const diet = userProfile?.find((item: any) => item.tagType === "diet");
  if (diet?.visible && diet?.userTags.length) {
    return (
      <Text style={[styles.descriptionText]}>
        {diet?.emoji}&nbsp;
        {diet?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === diet.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
};

const getEthnicityDetails = (userProfile: any) => {
  const ethnicity = userProfile?.find((item: any) => item.tagType === "ethnicity");
  if (ethnicity?.userTags.length > 0 && ethnicity?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {ethnicity?.emoji}&nbsp;
        {ethnicity?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === ethnicity?.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
};

const getReligionsDetails = (userProfile: any) => {
  const religion = userProfile?.find((item: any) => item.tagType === "religion");
  const religionName = religion?.userTags[0]?.tagName;

  const religiousPractice = userProfile?.find((item: any) => item.tagType === "religious_practice");
  const religiousPracticeName = religiousPractice?.userTags[0]?.tagName;

  if (
    (religion?.visible && religionName) ||
    (religiousPractice?.visible && religiousPracticeName)
  ) {
    return (
      <Text style={[styles.descriptionText]}>
        {religion?.emoji} {religionName}
        {religionName && religiousPracticeName ? " -" : ""}
        {!religionName ? religiousPractice?.emoji : ""} {religiousPracticeName}
      </Text>
    );
  }
};

const getRelationshipGoalsDetails = (userProfile: any) => {
  const relationshipGoal = userProfile?.find((item: any) => item.tagType === "relationship_goal");
  const relationshipGoalName = relationshipGoal?.userTags[0]?.tagName;
  if (relationshipGoal?.visible && relationshipGoalName) {
    return (
      <Text style={[styles.descriptionText]}>
        {relationshipGoal?.emoji} Looking for {relationshipGoalName}
      </Text>
    );
  }
};

const getRelationshipTypesDetails = (userProfile: any) => {
  const relationshipType = userProfile?.find((item: any) => item.tagType === "relationship_type");
  const relationshipTypeName = relationshipType?.userTags[0]?.tagName;
  if (relationshipType?.visible && relationshipTypeName) {
    return (
      <Text style={[styles.descriptionText]}>
        {relationshipType?.emoji} {relationshipTypeName}
      </Text>
    );
  }
};

const getCannabisDetails = (userProfile: any) => {
  const cannibisUsage = userProfile?.find((item: any) => item.tagType === "cannibis_usage");
  const cannibisUsageName = cannibisUsage?.userTags[0]?.tagName;
  if (cannibisUsage?.visible && cannibisUsageName) {
    return (
      <Text style={[styles.descriptionText]}>
        {cannibisUsage?.emoji} {cannibisUsageName}
      </Text>
    );
  }
};

export {
  getRelationshipGoalsDetails,
  getRelationshipTypesDetails,
  getParentingGoalDetails,
  getHometownDetails,
  getEthnicityDetails,
  getJobDetails,
  getSchoolDetails,
  getEducationLevelDetails,
  getReligionsDetails,
  getZodiacDetails,
  getMeyerBriggsDetails,
  getPoliticsDetails,
  getLanguagesDetails,
  getMusicGenreDetails,
  getBookGenreDetails,
  getPetsDetails,
  getSportsDetails,
  getGoingOutDetails,
  getStayingInDetails,
  getDietDetails,
  getDrinkDetails,
  getAlcoholDetails,
  getSmokingDetails,
  getCannabisDetails,
  getDrugsDetails,
  getCreativeOuletDetails,
};
