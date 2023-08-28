/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, ScrollView, View, Text, Image } from "react-native";
import { useQuery } from "@apollo/client";
import moment from "moment";
import { styles } from "./styles";
import { QuotedText } from "../../../components/atoms/QuotedText";
import { Colors, Spacing } from "../../../utils";
import { AppButton } from "../../../components/atoms/AppButton";
import { GET_USER_PROFILE_BY_LINK_ID } from "../../../services/graphql/user-link/queries";

const screenHeight = Dimensions.get("window").height;
const onethirdScreenHeight = screenHeight / 3;

const RequestFeedbackProfile = ({ route }: any) => {
  const [profile, setProfile] = useState<any>([]);
  const [merged, setMerged] = useState<any>([]);
  // const flex = route.params.profileData;
  // console.log("flex", flex);

  const { data: userProfileData } = useQuery(GET_USER_PROFILE_BY_LINK_ID, {
    variables: {
      id: "87c7a6d3-3ae4-458a-925d-b7be1425a8f4",
    },
  });

  useEffect(() => {
    if (userProfileData) {
      const userProfile = userProfileData?.getUserProfileByLinkId;
      setProfile(userProfile);
    }
  }, []);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={{
        //   uri: allImages ? allImages[0]?.videoOrPhoto : "../../assets/splash.png",
        uri: "../../../assets/images/natalie.jpeg",
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
                {prompts?.map((item: any) => {
                  if (item.promptId !== "" || item.answer !== "")
                    return (
                      <Text style={styles.descriptionText}>
                        {item.promptId}: {item.answer}
                      </Text>
                    );
                })}
              </View>
            </View> */}
            <View style={styles.section}>
              {/* <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.age}>{moment().diff(birthday, "years")} years old</Text> */}
              {/* <Text style={styles.city}> {user?.location?.city}</Text> */}

              <Text style={styles.descriptionHeader}>My Basics</Text>

              <View style={[styles.content, { flexDirection: "column" }]}>
                {/* {getRelationshipGoalsDetails(userProfile)}
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
                  {getCannabisDetails(userProfile)} */}
              </View>
            </View>
            {/* {getLanguagesDetails(userProfile)} */}
            <View style={styles.section}>
              <Text style={styles.descriptionHeader}>My Interests</Text>
              <View style={styles.content}>
                {/* {getMusicGenreDetails(userProfile)}
                  {getBookGenreDetails(userProfile)}
                  {getPetsDetails(userProfile)}
                  {getSportsDetails(userProfile)}
                  {getGoingOutDetails(userProfile)}
                  {getStayingInDetails(userProfile)}
                  {getCreativeOuletDetails(userProfile)} */}
              </View>
            </View>

            {/* alternate prompts and images */}
            {/* <View style={styles.content}>
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
            </View> */}
            <View
              style={{
                paddingHorizontal: 40,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
          padding: Spacing.SCALE_20,
        }}
      >
        <AppButton
          style={{
            backgroundColor: Colors.TEAL,
          }}
        >
          Continue to share your thoughts
        </AppButton>
      </View>
    </ImageBackground>
  );
};
export default RequestFeedbackProfile;
