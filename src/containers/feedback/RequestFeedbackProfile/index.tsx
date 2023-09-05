/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from "react";
import { ImageBackground, ScrollView, View, Text, Image } from "react-native";
import moment from "moment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { QuotedText } from "../../../components/atoms/QuotedText";
import { Colors, Spacing } from "../../../utils";
import { AppButton } from "../../../components/atoms/AppButton";
import { useAppSelector } from "../../../store/hooks";
import { selectFeedbackUser } from "../../../store/features/feedback/feedbackSlice";
import { screenName } from "../../../utils/constants";
import { selectAllPrompts } from "../../../store/features/prompts/promptsSlice";

const RequestFeedbackProfile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [merged, setMerged] = useState<any>([]);
  const { prompts, visuals, height, displayName, birthday, promptIds } =
    useAppSelector(selectFeedbackUser);
  const appPromptsRedux = useAppSelector(selectAllPrompts);

  const appPrompts = useMemo(() => {
    const ppts = Object.values(appPromptsRedux);
    return ppts;
  }, [appPromptsRedux]);

  useEffect(() => {
    const mergeData = () => {
      if (promptIds.length > 0 && visuals && visuals.length > 0) {
        const maxLength = Math.max(promptIds.length, visuals.length);
        setMerged([]);
        for (let i = 0; i < maxLength; i++) {
          if (visuals[i]) {
            setMerged((prev: any) => [...prev, { type: "image", image: visuals[i] }]);
          }
          const id = promptIds[i];
          if (id) {
            // search appPrompts for prompt that matches id
            const { prompt } = appPrompts.find((p) => p.promptId === id);

            if (prompts[i]?.answer) {
              setMerged((prev: any) => [
                ...prev,
                {
                  type: "prompt",
                  prompt: {
                    ...prompts[i],
                    prompt,
                  },
                },
              ]);
            }
          }
        }
      } else {
        setMerged([]);
        for (let i = 0; i < promptIds.length; i++) {
          const id = promptIds[i];
          const { prompt } = appPrompts.find((p) => p.promptId === id);
          if (prompts[id]?.answer !== "") {
            setMerged((prev: any) => [
              ...prev,
              {
                type: "prompt",
                prompt: {
                  ...prompts[i],
                  prompt,
                },
              },
            ]);
          }
        }
      }
    };
    mergeData();
  }, [visuals, prompts, promptIds, appPrompts]);

  console.log("merged", merged);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={{
        uri: visuals ? visuals[0]?.videoOrPhoto : "../../assets/splash.png",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.bio}>
          <View style={styles.descriptionContainer}>
            <View style={styles.section}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.age}>{moment().diff(birthday, "years")} years old</Text>
              <Text style={styles.age}>{height}</Text>

              <Text style={styles.descriptionHeader}>My Basics</Text>

              <View style={{ flexDirection: "column" }}>
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
              <View>
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
            <View>
              {merged.map((item: any, index: any) => {
                if (item?.type === "prompt") {
                  return (
                    <View
                      key={index}
                      style={{
                        padding: Spacing.SCALE_20,
                      }}
                    >
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
      <View style={styles.buttonBody}>
        <AppButton
          style={{
            backgroundColor: Colors.TEAL,
          }}
          onPress={() => navigation.navigate(screenName.FEEDBACK_IMPRESSIONS)}
        >
          Continue to share your thoughts
        </AppButton>
      </View>
    </ImageBackground>
  );
};
export default RequestFeedbackProfile;
