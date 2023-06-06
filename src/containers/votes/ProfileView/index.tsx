import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import { AppButton } from "../../../components/atoms/AppButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userSlice";
import { styles } from "./style";
import {
  RemoveActiveMatch,
  selectUserChoices,
  selectUserMatchImages,
  selectUserMatchPrompts,
  setMatchedUsers,
} from "../../../store/features/matches/matchSlice";
import { useMutation } from "@apollo/client";
import { USER_SWIPER_ACTION } from "../../../services/graphql/profile/mutations";
import { Spacing } from "../../../utils";
import { QuotedText } from "../../../components/atoms/QuotedText";
import LikeButtonsView from "../../../components/molecule/LikeButtonsView";

const screenHeight = Dimensions.get("window").height;
const onethirdScreenHeight = screenHeight / 3;

export const ProfileView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;

  const userChoices = useAppSelector(selectUserChoices);
  const userProfile = userChoices[0].profile;
  const userPrompts = useAppSelector(selectUserMatchPrompts);
  const allImages = useAppSelector(selectUserMatchImages);

  const [handleLikeDislike] = useMutation(USER_SWIPER_ACTION);

  const handleLike = () => {
    // logEvent({
    //   eventName: eventNames.acceptMatchButton,
    //   params:{
    //     userId,
    //     screenClass:screenClass.matches}
    // })
    const choice = "yes";
    handleLikeDislike({
      variables: {
        choice,
        matchId: userChoices[0].id,
      },
      onCompleted: (data) => {
        const { message, user1, user2 } = data.userSwipeAction;
        if (message === "match created") {
          dispatch(
            setMatchedUsers({
              matchedUsers: [user1, user2],
            })
          );
          navigation.navigate(screenName.MATCH_VIEW);
        } else {
          dispatch(
            RemoveActiveMatch({
              activeMatchId: userChoices[0].id,
            })
          );
          navigation.popToTop();
        }
      },
      onError: (error) => {},
    });
  };

  const handleDislike = () => {
    // logEvent({
    //   eventName: eventNames.declineMatchButton,
    //   params:{
    //     userId,
    //     screenClass:screenClass.matches,}
    // })
    const choice = "no";
    handleLikeDislike({
      variables: {
        choice,
        matchId: userChoices[0].id,
      },
      onCompleted: (data) => {
        dispatch(
          RemoveActiveMatch({
            activeMatchId: userChoices[0].id,
          })
        );
        navigation.popToTop();
      },
      onError: (error) => {},
    });
  };

  const [merged, setMerged] = useState<any>([]);

  const getJobDetails = () => {
    const company = userProfile?.find(
      (item: any) => item.tagType === "company"
    );
    const companyString = company?.userTags[0]?.tagName
      ? `@ ${company?.userTags[0]?.tagName}`
      : "";
    const job = userProfile?.find((item: any) => item.tagType === "job");
    const jobString = job?.userTags[0]?.tagName
      ? `${job?.userTags[0]?.tagName} `
      : "";
    if (job?.userTags[0]?.tagName != "" && job?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {userProfile?.find((item: any) => item.tagType === "job")?.emoji}
          {jobString}
          {companyString}
        </Text>
      );
    }
  };

  const getSchoolDetails = () => {
    const schoolName = userProfile?.find(
      (item: any) => item.tagType === "school"
    )?.userTags[0]?.tagName;
    const school = userProfile?.find((item: any) => item.tagType === "school");
    if (school?.visible && schoolName)
      return (
        <Text style={[styles.descriptionText]}>
          {school?.emoji} {schoolName}
        </Text>
      );
  };

  const getLanguagesDetails = () => {
    const languages = userProfile?.find(
      (item: any) => item.tagType === "language"
    );
    if (languages?.userTags.length > 0 && languages?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {userProfile?.find((item: any) => item.tagType === "language")?.emoji}
          {languages?.userTags.map((item: any, index: any) => {
            return (
              <Text key={index}>
                {item.tagName}
                {index === languages.length - 1 ? "" : ", "}
              </Text>
            );
          })}
        </Text>
      );
    }
  };

  const getMusicGenreDetails = () => {
    const music = userProfile?.find(
      (item: any) => item.tagType === "music_genre"
    );
    if (music?.userTags.length > 0 && music?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {
            userProfile?.find((item: any) => item.tagType === "music_genre")
              ?.emoji
          }
          {music?.userTags.map((item: any, index: any) => {
            return (
              <Text key={index}>
                {item.tagName}
                {index === music.length - 1 ? "" : ", "}
              </Text>
            );
          })}
        </Text>
      );
    }
  };

  const getBookGenreDetails = () => {
    const book = userProfile?.find(
      (item: any) => item.tagType === "book_genre"
    );
    if (book?.userTags.length > 0 && book?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {
            userProfile?.find((item: any) => item.tagType === "book_genre")
              ?.emoji
          }
          {book?.userTags.map((item: any, index: any) => {
            return (
              <Text key={index}>
                {item.tagName}
                {index === book.length - 1 ? "" : ", "}
              </Text>
            );
          })}
        </Text>
      );
    }
  };

  const getPetsDetails = () => {
    const pets = userProfile?.find((item: any) => item.tagType === "pets");
    if (pets?.userTags.length > 0 && pets?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {userProfile?.find((item: any) => item.tagType === "pets")?.emoji}
          {pets?.userTags.map((item: any, index: any) => {
            return (
              <Text key={index}>
                {item.tagName}
                {index === pets.length - 1 ? "" : ", "}
              </Text>
            );
          })}
        </Text>
      );
    }
  };

  const getSportsDetails = () => {
    const sports = userProfile?.find(
      (item: any) => item.tagType === "physical_activity"
    );
    if (sports?.userTags.length > 0 && sports?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {
            userProfile?.find(
              (item: any) => item.tagType === "physical_activity"
            )?.emoji
          }
          {sports?.userTags.map((item: any, index: any) => {
            return (
              <Text key={index}>
                {item.tagName}
                {index === sports.length - 1 ? "" : ", "}
              </Text>
            );
          })}
        </Text>
      );
    }
  };

  const getGoingOutDetails = () => {
    const goingOut = userProfile?.find(
      (item: any) => item.tagType === "going_out"
    );
    if (goingOut?.userTags.length > 0 && goingOut?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {
            userProfile?.find((item: any) => item.tagType === "going_out")
              ?.emoji
          }
          {goingOut?.userTags.map((item: any, index: any) => {
            return (
              <Text key={index}>
                {item.tagName}
                {index === goingOut.length - 1 ? "" : ", "}
              </Text>
            );
          })}
        </Text>
      );
    }
  };

  const getCreativeOuletDetails = () => {
    const creative = userProfile?.find(
      (item: any) => item.tagType === "creative"
    );
    if (creative?.userTags.length > 0 && creative?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {userProfile?.find((item: any) => item.tagType === "creative")?.emoji}
          {creative?.userTags.map((item: any, index: any) => {
            return (
              <Text key={index}>
                {item.tagName}
                {index === creative.length - 1 ? "" : ", "}
              </Text>
            );
          })}
        </Text>
      );
    }
  };

  const getStayingInDetails = () => {
    const stayingIn = userProfile?.find(
      (item: any) => item.tagType === "staying_in"
    );
    if (stayingIn?.userTags.length > 0 && stayingIn?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {
            userProfile?.find((item: any) => item.tagType === "staying_in")
              ?.emoji
          }
          {stayingIn?.userTags.map((item: any, index: any) => {
            return (
              <Text key={index}>
                {item.tagName}
                {index === stayingIn.length - 1 ? "" : ", "}
              </Text>
            );
          })}
        </Text>
      );
    }
  };

  const getDrinkDetails = () => {
    const drink = userProfile?.find((item: any) => item.tagType === "drink");
    if (drink?.userTags.length > 0 && drink?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {userProfile?.find((item: any) => item.tagType === "drink")?.emoji}
          {drink?.userTags.map((item: any, index: any) => {
            return (
              <Text key={index}>
                {item.tagName}
                {index === drink.length - 1 ? "" : ", "}
              </Text>
            );
          })}
        </Text>
      );
    }
  };

  const getDietDetails = () => {
    const diet = userProfile?.find((item: any) => item.tagType === "diet");
    const dietName = diet?.userTags[0]?.tagName;
    if (diet?.visible && dietName) {
      return (
        <Text style={[styles.descriptionText]}>
          {diet?.emoji} {dietName}
        </Text>
      );
    }
  };

  const getPoliticsDetails = () => {
    const politics = userProfile?.find(
      (item: any) => item.tagType === "politics"
    );
    const politicsName = politics?.userTags[0]?.tagName;
    if (politics?.visible && politicsName) {
      return (
        <Text style={[styles.descriptionText]}>
          {politics?.emoji} {politicsName}
        </Text>
      );
    }
  };

  const getAlcoholDetails = () => {
    const alcohol = userProfile?.find(
      (item: any) => item.tagType === "alcohol"
    );
    const alcoholName = alcohol?.userTags[0]?.tagName;
    if (alcohol?.visible && alcoholName) {
      return (
        <Text style={[styles.descriptionText]}>
          {alcohol?.emoji} {alcoholName}
        </Text>
      );
    }
  };

  const getSmokingDetails = () => {
    const smoking = userProfile?.find(
      (item: any) => item.tagType === "smoking"
    );
    const smokingName = smoking?.userTags[0]?.tagName;
    if (smoking?.visible && smokingName) {
      return (
        <Text style={[styles.descriptionText]}>
          {smoking?.emoji} {smokingName}
        </Text>
      );
    }
  };

  const getDrugsDetails = () => {
    const drug = userProfile?.find(
      (item: any) => item.tagType === "drug_usage"
    );
    const drugName = drug?.userTags[0]?.tagName;
    if (drug?.visible && drugName) {
      return (
        <Text style={[styles.descriptionText]}>
          {drug?.emoji} {drugName}
        </Text>
      );
    }
  };

  const getZodiacDetails = () => {
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

  const getMeyerBriggsDetails = () => {
    const meyerBriggs = userProfile?.find(
      (item: any) => item.tagType === "meyer_briggs"
    );
    const meyerBriggsName = meyerBriggs?.userTags[0]?.tagName;
    if (meyerBriggs?.visible && meyerBriggsName) {
      return (
        <Text style={[styles.descriptionText]}>
          {meyerBriggs?.emoji} {meyerBriggsName}
        </Text>
      );
    }
  };

  const getParentingGoalDetails = () => {
    const parenting_goal = userProfile?.find(
      (item: any) => item.tagType === "parenting_goal"
    );
    const parenting_goal_name = parenting_goal?.userTags[0]?.tagName;
    if (parenting_goal?.visible && parenting_goal_name) {
      return (
        <Text style={[styles.descriptionText]}>
          {parenting_goal?.emoji} {parenting_goal_name}
        </Text>
      );
    }
  };

  const getEducationLevelDetails = () => {
    const education = userProfile?.find(
      (item: any) => item.tagType === "education"
    );
    const educationName = education?.userTags[0]?.tagName;
    if (education?.visible && educationName) {
      return (
        <Text style={[styles.descriptionText, { fontSize: Spacing.SCALE_14 }]}>
          {education?.emoji} {educationName}
        </Text>
      );
    }
  };

  const getHometownDetails = () => {
    const hometown = userProfile?.find(
      (item: any) => item.tagType === "homeTown"
    );
    const hometownName = hometown?.userTags[0]?.tagName;
    if (hometown?.visible && hometownName)
      return (
        <Text style={[styles.descriptionText]}>
          {hometown?.emoji} {hometownName}
        </Text>
      );
  };

  const getEthnicityDetails = () => {
    const ethnicity = userProfile?.find(
      (item: any) => item.tagType === "ethnicity"
    );
    if (ethnicity?.userTags.length > 0 && ethnicity?.visible) {
      return (
        <Text style={[styles.descriptionText]}>
          {
            userProfile?.find((item: any) => item.tagType === "ethnicity")
              ?.emoji
          }
          {ethnicity?.userTags.map((item: any, index: any) => {
            return (
              <Text key={index}>
                {item.tagName}
                {index === ethnicity.length - 1 ? "" : ", "}
              </Text>
            );
          })}
        </Text>
      );
    }
  };

  const getReligionsDetails = () => {
    const religion = userProfile?.find(
      (item: any) => item.tagType === "religion"
    );
    const religionName = religion?.userTags[0]?.tagName;
    if (religion?.visible && religionName) {
      return (
        <Text style={[styles.descriptionText]}>
          {religion?.emoji} {religionName}
        </Text>
      );
    }
  };

  const getReligiousPracticeDetails = () => {
    const religiousPractice = userProfile?.find(
      (item: any) => item.tagType === "religiousPractice"
    );
    const religiousPracticeName = religiousPractice?.userTags[0]?.tagName;
    if (religiousPractice?.visible && religiousPracticeName) {
      return (
        <Text style={[styles.descriptionText]}>
          {religiousPractice?.emoji} {religiousPracticeName}
        </Text>
      );
    }
  };

  const getRelationshipGoalsDetails = () => {
    const relationship_goal = userProfile?.find(
      (item: any) => item.tagType === "relationship_goal"
    );
    const relationship_goal_name = relationship_goal?.userTags[0]?.tagName;
    if (relationship_goal?.visible && relationship_goal_name) {
      return (
        <Text style={[styles.descriptionText]}>
          {relationship_goal?.emoji} {relationship_goal_name}
        </Text>
      );
    }
  };

  const getRelationshipTypesDetails = () => {
    const relationship_type = userProfile?.find(
      (item: any) => item.tagType === "relationship_type"
    );
    const relationship_type_name = relationship_type?.userTags[0]?.tagName;
    if (relationship_type?.visible && relationship_type_name) {
      return (
        <Text style={[styles.descriptionText]}>
          {relationship_type?.emoji} {relationship_type_name}
        </Text>
      );
    }
  };

  const getCannabisDetails = () => {
    const cannibis_usage = userProfile?.find(
      (item: any) => item.tagType === "cannibis_usage"
    );
    const cannibis_usage_name = cannibis_usage?.userTags[0]?.tagName;
    if (cannibis_usage?.visible && cannibis_usage_name) {
      return (
        <Text style={[styles.descriptionText]}>
          {cannibis_usage?.emoji} {cannibis_usage_name}
        </Text>
      );
    }
  };

  useEffect(() => {
    const mergeData = () => {
      if (allImages.length > 0) {
        setMerged([]);
        for (let i = 0; i < allImages.length; i++) {
          setMerged((prev: any) => [
            ...prev,
            { type: "image", image: allImages[i] },
          ]);
          if (userPrompts[i]) {
            if (userPrompts[i].answer !== "") {
              setMerged((prev: any) => [
                ...prev,
                { type: "prompt", prompt: userPrompts[i] },
              ]);
            }
          }
        }
        return merged;
      } else {
        setMerged([]);
        for (let i = 0; i < userPrompts.length; i++) {
          if (userPrompts[i].answer !== "") {
            setMerged((prev: any) => [
              ...prev,
              { type: "prompt", prompt: userPrompts[i] },
            ]);
          }
        }
        return merged;
      }
    };
    mergeData();
    // onScreenView({
    //   screenName:screenNames.profileView,
    //   screenType:screenClass.matches,
    // })
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="cover"
        source={{
          uri: allImages[0]?.videoOrPhoto,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              marginTop: onethirdScreenHeight,
              marginBottom: 70,
              backgroundColor: "white",
              borderTopRightRadius: 110,
              padding: 20,
            }}
          >
            <View style={styles.descriptionContainer}>
              {/* <View style={styles.section}>
                <Text style={styles.descriptionHeader}>Prompts</Text>
                <View style={styles.content}>
                  {prompts.map((item: any) => {
                    if (item.prompt !== '' || item.answer !== '')
                      return (
                        <Text style={styles.descriptionText}>
                          {item.prompt}: {item.answer}
                        </Text>
                      )
                  })}
                </View>
              </View> */}
              <View style={styles.section}>
                <Text style={styles.name}>{userChoices[0].choiceName}</Text>
                <Text style={styles.age}>
                  {/* {age} years old, {height} */}
                </Text>
                <Text style={styles.descriptionHeader}>My Basics</Text>

                <View style={[styles.content, { flexDirection: "column" }]}>
                  {getJobDetails()}
                  {getSchoolDetails()}
                  {getHometownDetails()}
                  {getEducationLevelDetails()}
                  {getEthnicityDetails()}
                  {getReligionsDetails()}
                  {getReligiousPracticeDetails()}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.descriptionHeader}>My Interests</Text>
                <View style={styles.content}>
                  {getMusicGenreDetails()}
                  {getBookGenreDetails()}
                  {getPetsDetails()}
                  {getSportsDetails()}
                  {getGoingOutDetails()}
                  {getStayingInDetails()}
                  {getDrinkDetails()}
                  {getDietDetails()}
                  {getPoliticsDetails()}
                  {getAlcoholDetails()}
                  {getSmokingDetails()}
                  {getDrugsDetails()}
                  {getCreativeOuletDetails()}
                  {getZodiacDetails()}
                  {getMeyerBriggsDetails()}
                  {getParentingGoalDetails()}
                  {getRelationshipGoalsDetails()}
                  {getRelationshipTypesDetails()}
                  {getCannabisDetails()}
                </View>
              </View>
              <View>
                <View style={styles.section}>
                  <Text style={styles.descriptionHeader}>Languages I know</Text>
                  {getLanguagesDetails()}
                </View>
              </View>
              {/* alternate prompts and images */}
              <View style={styles.content}>
                {merged.map((item: any, index: any) => {
                  if (item?.type === "prompt") {
                    return (
                      <View
                        key={index}
                        style={{
                          // backgroundColor: 'red',
                          padding: Spacing.SCALE_20,
                        }}
                      >
                        {/* <Text>{item.prompt.answer}</Text> */}
                        <QuotedText
                          title={item.prompt.prompt}
                          text={item.prompt.answer}
                        />
                      </View>
                    );
                  } else {
                    return (
                      <View
                        key={index}
                        style={{
                          flex: 1,
                        }}
                      >
                        <Image
                          // resizeMode='cover'
                          source={{
                            uri: item?.image?.videoOrPhoto,
                          }}
                          style={{
                            width: "100%",
                            height: 300,
                            resizeMode: "cover",
                          }}
                        />
                      </View>
                    );
                  }
                })}
              </View>
              <View
                style={{
                  paddingHorizontal: 40,
                }}
              >
                <LikeButtonsView like={handleLike} dislike={handleDislike} />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
