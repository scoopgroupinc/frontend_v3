/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, Text, View, Image, Dimensions } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { screenName } from "../../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  RemoveActiveChoice,
  selectUserChoiceImages,
  selectUserChoicePrompts,
  selectUserChoices,
  setMatchedUsers,
} from "../../../store/features/matches/matchSlice";
import { USER_SWIPER_ACTION } from "../../../services/graphql/profile/mutations";
import { Spacing } from "../../../utils";
import { QuotedText } from "../../../components/atoms/QuotedText";
import LikeButtonsView from "../../../components/molecule/LikeButtonsView";
import { logEvent, onScreenView } from "../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";
import { selectUser } from "../../../store/features/user/userSlice";
import {
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
  getDrinkDetails,
  getDietDetails,
  getAlcoholDetails,
  getSmokingDetails,
  getDrugsDetails,
  getCannabisDetails,
  getCreativeOuletDetails,
} from "../../../features/ProfileView/components/getDetails";
import { styles } from "../../../features/ProfileView/styles";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import { selectAllPrompts } from "../../../store/features/prompts/promptsSlice";

const screenHeight = Dimensions.get("window").height;
const onethirdScreenHeight = screenHeight / 3;

export const ProfileView = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  useOnScreenView({
    screenName: analyticScreenNames.profileView,
    screenType: screenClass.matches,
  });

  const { user } = useAppSelector(selectUser);
  const userId = user?.id;
  const userChoices = useAppSelector(selectUserChoices);
  const userProfile = userChoices[0].profile;
  const userPrompts = useAppSelector(selectUserChoicePrompts);
  const promptIds = userPrompts.map(prompt => prompt.promptId);
  const allImages = useAppSelector(selectUserChoiceImages);
  const allPrompts = useAppSelector(selectAllPrompts);

  const [handleLikeDislike] = useMutation(USER_SWIPER_ACTION);

  const handleLike = () => {
    logEvent({
      eventName: eventNames.acceptMatchButton,
      params: {
        userId,
        screenClass: screenClass.matches,
      },
    });
    const choice = "yes";
    handleLikeDislike({
      variables: {
        choice,
        matchId: userChoices[0]?.id,
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
            RemoveActiveChoice({
              activeChoiceId: userChoices[0]?.id,
            })
          );
          navigation.popToTop();
        }
      },
      onError: () => {},
    });
  };

  const handleDislike = () => {
    logEvent({
      eventName: eventNames.declineMatchButton,
      params: {
        userId,
        screenClass: screenClass.matches,
      },
    });
    const choice = "no";
    handleLikeDislike({
      variables: {
        choice,
        matchId: userChoices[0].id,
      },
      onCompleted: () => {
        dispatch(
          RemoveActiveChoice({
            activeChoiceId: userChoices[0].id,
          })
        );
        navigation.popToTop();
      },
      onError: () => {},
    });
  };

  const [merged, setMerged] = useState<any>([]);

  useEffect(() => {
    const mergeData = () => {
      if (userPrompts.length > 0 && allImages && allImages.length > 0) {
        // get the max length of the two arrays
        const maxLength = Math.max(
          userPrompts.filter((x: any) => x.answer !== "").length,
          allImages.length
        );

        setMerged([]);
        for (let i = 0; i < maxLength; i++) {
          if (allImages[i]) {
            setMerged((prev: any) => [...prev, { type: "image", image: allImages[i] }]);
          }
          const id = promptIds[i];
          if (id) {
            if (userPrompts[id]?.answer) {
              setMerged((prev: any) => [...prev, { type: "prompt", prompt: userPrompts[i] }]);
            }
          }
        }
      }
      setMerged([]);
      for (let i = 0; i < promptIds.length; i++) {
        const id = promptIds[i];
        if (userPrompts[id].answer !== "") {
          setMerged((prev: any) => [...prev, { type: "prompt", prompt: userPrompts[id] }]);
        }
      }
    };
    mergeData();
  }, [allImages, userPrompts, promptIds]);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={{
        uri: allImages ? allImages[0]?.videoOrPhoto : "../../assets/splash.png",
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
              <Text style={styles.age}>{/* {age} years old, {height} */}</Text>
              <Text style={styles.descriptionHeader}>My Basics</Text>
            </View>
            <View style={[styles.content, { flexDirection: "column" }]}>
              {getRelationshipGoalsDetails(userProfile)}
              {getRelationshipTypesDetails(userProfile)}
              {getParentingGoalDetails(userProfile)}
              {getHometownDetails(userProfile)}
              {getEthnicityDetails(userProfile)}
              {getJobDetails(userProfile)}
              {getSchoolDetails(userProfile)}
              {getEducationLevelDetails(userProfile)}
              {getReligionsDetails(userProfile)}
              {getZodiacDetails(userProfile)}
              {getMeyerBriggsDetails(userProfile)}
              {getPoliticsDetails(userProfile)}
              {getDietDetails(userProfile)}
              {getDrinkDetails(userProfile)}
              {getAlcoholDetails(userProfile)}
              {getSmokingDetails(userProfile)}
              {getDrugsDetails(userProfile)}
              {getCannabisDetails(userProfile)}
            </View>
          </View>
          {getLanguagesDetails(userProfile)}
          <View style={styles.section}>
            <Text style={styles.descriptionHeader}>My Interests</Text>
            <View style={styles.content}>
              {getMusicGenreDetails(userProfile)}
              {getBookGenreDetails(userProfile)}
              {getPetsDetails(userProfile)}
              {getSportsDetails(userProfile)}
              {getGoingOutDetails(userProfile)}
              {getStayingInDetails(userProfile)}
              {getCreativeOuletDetails(userProfile)}
            </View>
          </View>
          <View>
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
                        title={allPrompts[item.prompt.promptId]?.prompt}
                        text={item.prompt.answer}
                      />
                    </View>
                  );
                }
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
  );
};
