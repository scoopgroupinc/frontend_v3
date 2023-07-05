import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAppSelector } from "../../../store/hooks";
import {
  selectUser,
  selectUserProfile,
  selectUserPrompts,
  selectUserVisuals,
} from "../../../store/features/user/userSlice";
import { Spacing } from "../../../utils";
import { QuotedText } from "../../../components/atoms/QuotedText";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { onScreenView } from "../../../analytics";
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

const screenHeight = Dimensions.get("window").height;
const onethirdScreenHeight = screenHeight / 3;

export const UserProfileView = () => {
  const userProfile = useAppSelector(selectUserProfile);
  const userPrompts = useAppSelector(selectUserPrompts);
  const allImages = useAppSelector(selectUserVisuals);
  const { user } = useAppSelector(selectUser);

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
          if (userPrompts[i]) {
            if (userPrompts[i].answer !== "") {
              setMerged((prev: any) => [...prev, { type: "prompt", prompt: userPrompts[i] }]);
            }
          }
        }
      }
      setMerged([]);
      for (let i = 0; i < userPrompts.length; i++) {
        if (userPrompts[i].answer !== "") {
          setMerged((prev: any) => [...prev, { type: "prompt", prompt: userPrompts[i] }]);
        }
      }
    };
    mergeData();

    onScreenView({
      screenName: analyticScreenNames.profileView,
      screenType: screenClass.profile,
    });
  }, [allImages, userPrompts]);

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
            marginBottom: "10%",
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
              <Text style={styles.name}>{`${user?.firstName} ${user?.lastName}`}</Text>
              {/* <Text style={styles.age}>
                {age} years old, {height}
              </Text> */}
              <Text style={styles.city}> {user?.location?.city}</Text>

              <Text style={styles.descriptionHeader}>My Basics</Text>

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
                      <QuotedText title={item.prompt.prompt} text={item.prompt.answer} />
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
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
