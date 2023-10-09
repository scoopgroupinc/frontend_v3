import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";
import { Spacing } from "../../../utils";
import { TAGS, TAG_VISIBLE_TYPES } from "../../../utils/types/TAGS";

const getHometownDetails = (userTags: any) => {
  const hometown = userTags[TAG_VISIBLE_TYPES.home_town];
  const hometownName = hometown?.userTags[0]?.tagName;
  if (hometown?.visible && hometownName) {
    return <Text style={[styles.descriptionText]}>🏠 {hometownName}</Text>;
  }
  return null;
};

const getJobDetails = (userTags: any) => {
  const company = userTags[TAG_VISIBLE_TYPES.company];
  const companyString =
    company?.visible && company?.userTags[0]?.tagName ? `@ ${company?.userTags[0]?.tagName}` : "";
  const job = userTags[TAG_VISIBLE_TYPES.job];
  const jobString =
    job?.visible && job?.userTags[0]?.tagName ? `${job?.userTags[0]?.tagName} ` : "";
  if (jobString || companyString) {
    return (
      <Text style={[styles.descriptionText]}>
        👨🏻‍💻 {jobString}
        {companyString}
      </Text>
    );
  }
  return null;
};

const getSchoolDetails = (userTags: any) => {
  const school = userTags[TAG_VISIBLE_TYPES.school];
  const schoolName = school?.userTags[0]?.tagName;
  if (school?.visible && schoolName) {
    return <Text style={[styles.descriptionText]}>🎓 {schoolName}</Text>;
  }
  return null;
};

const getLanguagesDetails = (userTags: any) => {
  const languages = userTags[TAG_VISIBLE_TYPES.language];
  if (languages?.userTags.length > 0 && languages?.visible) {
    return (
      <View>
        <View style={styles.section}>
          <Text style={styles.descriptionHeader}>Languages I know</Text>
          <Text style={[styles.descriptionText]}>
            {userTags[TAG_VISIBLE_TYPES.language].emoji}&nbsp;
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
  return null;
};

const getMusicGenreDetails = (userTags: any) => {
  const music = userTags[TAG_VISIBLE_TYPES.music_genre];
  const emoji = TAGS[TAG_VISIBLE_TYPES.school].find(
    (item) => item.tagName === music.tagName
  )?.emoji;
  if (music?.userTags.length > 0 && music?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userTags[TAG_VISIBLE_TYPES.music_genre].emoji}&nbsp;
        {music?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === music.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
  return null;
};

const getBookGenreDetails = (userTags: any) => {
  const book = userTags[TAG_VISIBLE_TYPES.book_genre];
  if (book?.userTags.length > 0 && book?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userTags[TAG_VISIBLE_TYPES.book_genre].emoji}&nbsp;
        {book?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === book.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
  return null;
};

const getPetsDetails = (userTags: any) => {
  const pets = userTags[TAG_VISIBLE_TYPES.pets];
  if (pets?.userTags.length > 0 && pets?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userTags[TAG_VISIBLE_TYPES.pets].emoji}&nbsp;
        {pets?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === pets.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
  return null;
};

const getSportsDetails = (userTags: any) => {
  const sports = userTags[TAG_VISIBLE_TYPES.physical_activity];
  if (sports?.userTags.length > 0 && sports?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userTags[TAG_VISIBLE_TYPES.physical_activity].emoji}&nbsp;
        {sports?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === sports.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
  return null;
};

const getGoingOutDetails = (userTags: any) => {
  const goingOut = userTags[TAG_VISIBLE_TYPES.going_out];
  if (goingOut?.userTags.length > 0 && goingOut?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userTags[TAG_VISIBLE_TYPES.going_out].emoji}&nbsp;
        {goingOut?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === goingOut.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
  return null;
};

const getCreativeOuletDetails = (userTags: any) => {
  const creative = userTags[TAG_VISIBLE_TYPES.creative];
  if (creative?.userTags.length > 0 && creative?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userTags[TAG_VISIBLE_TYPES.creative].emoji}&nbsp;
        {creative?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === creative.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
  return null;
};

const getStayingInDetails = (userTags: any) => {
  const stayingIn = userTags[TAG_VISIBLE_TYPES.staying_in];
  if (stayingIn?.userTags.length > 0 && stayingIn?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userTags[TAG_VISIBLE_TYPES.staying_in].emoji}&nbsp;
        {stayingIn?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === stayingIn.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
  return null;
};

const getDrinkDetails = (userTags: any) => {
  const drink = userTags[TAG_VISIBLE_TYPES.drink];
  if (drink?.userTags.length > 0 && drink?.visible) {
    return (
      <Text style={[styles.descriptionText]}>
        {userTags[TAG_VISIBLE_TYPES.drink].emoji}&nbsp;
        {drink?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === drink.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
  return null;
};

const getPoliticsDetails = (userTags: any) => {
  const politics = userTags[TAG_VISIBLE_TYPES.politics];
  const politicsName = politics?.userTags[0]?.tagName;
  if (politics?.visible && politicsName) {
    return (
      <Text style={[styles.descriptionText]}>
        {politics?.emoji} {politicsName}
      </Text>
    );
  }
  return null;
};

const getAlcoholDetails = (userTags: any) => {
  const alcohol = userTags[TAG_VISIBLE_TYPES.alcohol_usage];
  const alcoholName = alcohol?.userTags[0]?.tagName;
  if (alcohol?.visible && alcoholName) {
    return (
      <Text style={[styles.descriptionText]}>
        {alcohol?.emoji} {alcoholName}
      </Text>
    );
  }
  return null;
};

const getSmokingDetails = (userTags: any) => {
  const smoking = userTags[TAG_VISIBLE_TYPES.smoking];
  const smokingName = smoking?.userTags[0]?.tagName;
  if (smoking?.visible && smokingName) {
    return (
      <Text style={[styles.descriptionText]}>
        {smoking?.emoji} {smokingName}
      </Text>
    );
  }
  return null;
};

const getDrugsDetails = (userTags: any) => {
  const drug = userTags[TAG_VISIBLE_TYPES.drug_usage];
  const drugName = drug?.userTags[0]?.tagName;
  if (drug?.visible && drugName) {
    return (
      <Text style={[styles.descriptionText]}>
        {drug?.emoji} {drugName}
      </Text>
    );
  }
  return null;
};

const getZodiacDetails = (userTags: any) => {
  const zodiac = userTags[TAG_VISIBLE_TYPES.zodiac];
  const zodiacName = zodiac?.userTags[0]?.tagName;
  if (zodiac?.visible && zodiacName) {
    return (
      <Text style={[styles.descriptionText]}>
        {zodiac?.emoji} {zodiacName}
      </Text>
    );
  }
  return null;
};

const getMeyerBriggsDetails = (userTags: any) => {
  const meyerBriggs = userTags[TAG_VISIBLE_TYPES.meyer_briggs];
  const meyerBriggsName = meyerBriggs?.userTags[0]?.tagName;
  if (meyerBriggs?.visible && meyerBriggsName) {
    return (
      <Text style={[styles.descriptionText]}>
        {meyerBriggs?.emoji} {meyerBriggsName}
      </Text>
    );
  }
  return null;
};

const getParentingGoalDetails = (userTags: any) => {
  const parentingGoal = userTags[TAG_VISIBLE_TYPES.parenting_goal];
  if (parentingGoal?.visible && parentingGoal?.userTags.length > 0) {
    return (
      <Text style={[styles.descriptionText]}>
        {parentingGoal?.emoji}&nbsp;
        {parentingGoal?.userTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === parentingGoal.userTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
  return null;
};

const getEducationLevelDetails = (userTags: any) => {
  const education = userTags[TAG_VISIBLE_TYPES.education];
  const educationName = education?.userTags[0]?.tagName;
  if (education?.visible && educationName) {
    return (
      <Text style={[styles.descriptionText, { fontSize: Spacing.SCALE_14 }]}>
        {education?.emoji} {educationName}
      </Text>
    );
  }
  return null;
};

const getDietDetails = (userTags: any) => {
  const diet = userTags[TAG_VISIBLE_TYPES.diet];
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
  return null;
};

const getEthnicityDetails = (userTags: any) => {
  const ethnicity = userTags[TAG_VISIBLE_TYPES.ethnicity];
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
  return null;
};

const getReligionsDetails = (userTags: any) => {
  const religion = userTags[TAG_VISIBLE_TYPES.religion];
  const religionName = religion?.userTags[0]?.tagName;

  const religiousPractice = userTags[TAG_VISIBLE_TYPES.religious_practice];
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
  return null;
};

const getRelationshipGoalsDetails = (userTags: any) => {
  const relationshipGoal = userTags[TAG_VISIBLE_TYPES.relationship_goal];
  const relationshipTags = relationshipGoal?.userTags;
  if (relationshipGoal?.visible && relationshipTags.length > 0) {
    return (
      <Text style={[styles.descriptionText]}>
        {relationshipGoal?.emoji} Looking for&nbsp;
        {relationshipTags.map((item: any, index: any) => (
          <Text key={index}>
            {item.tagName}
            {index === relationshipTags.length - 1 ? "" : ", "}
          </Text>
        ))}
      </Text>
    );
  }
  return null;
};

const getRelationshipTypesDetails = (userTags: any) => {
  const relationshipType = userTags[TAG_VISIBLE_TYPES.relationship_type];
  const relationshipTypeName = relationshipType?.userTags[0]?.tagName;
  if (relationshipType?.visible && relationshipTypeName) {
    return (
      <Text style={[styles.descriptionText]}>
        {relationshipType?.emoji} {relationshipTypeName}
      </Text>
    );
  }
  return null;
};

const getCannabisDetails = (userTags: any) => {
  const cannibisUsage = userTags[TAG_VISIBLE_TYPES.cannibis_usage];
  const cannibisUsageName = cannibisUsage?.userTags[0]?.tagName;
  if (cannibisUsage?.visible && cannibisUsageName) {
    return (
      <Text style={[styles.descriptionText]}>
        {cannibisUsage?.emoji} {cannibisUsageName}
      </Text>
    );
  }
  return null;
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
