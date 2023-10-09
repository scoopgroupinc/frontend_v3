/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from "react";
import { ImageBackground, ScrollView, View, Text, Image } from "react-native";
import moment from "moment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../features/ProfileView/styles";
import { QuotedText } from "../../../components/atoms/QuotedText";
import { Colors, Spacing } from "../../../utils";
import { AppButton } from "../../../components/atoms/AppButton";
import { useAppSelector } from "../../../store/hooks";
import { selectFeedbackUser } from "../../../store/features/feedback/feedbackSlice";
import { screenName } from "../../../utils/constants";
import { selectAllPrompts } from "../../../store/features/prompts/promptsSlice";
import {
  getHometownDetails,
  getJobDetails,
  getSchoolDetails,
} from "../../../features/ProfileView/components/getDetails";
import { ProfilePageDetails } from "../../../features/ProfileView/components/ProfilePageDetails";
import { heightsByInch } from "../../../utils/constants/heights";

const RequestFeedbackProfile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [merged, setMerged] = useState<any>([]);
  const user = useAppSelector(selectFeedbackUser);
  const { prompts, visuals, height, firstName, birthday, promptIds, tags, location } = user;
  const userTags = {};
  Object.values(tags).forEach((tag) => {
    userTags[tag.tagId] = tag;
  });
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
        <View style={styles.whiteArc}>
          <View style={styles.descriptionContainer}>
            <View style={styles.section}>
              <Text style={styles.name}>{firstName}</Text>
              {birthday && (
                <Text style={styles.descriptionText}>
                  {moment().diff(birthday, "years")} years old
                </Text>
              )}
              {height && <Text style={styles.descriptionText}>{heightsByInch[height]?.label}</Text>}
              {location?.city && <Text style={styles.descriptionText}>{location?.city}</Text>}
              {getHometownDetails(userTags)}
              {getJobDetails(userTags)}
              {getSchoolDetails(userTags)}
              <ProfilePageDetails userTags={userTags} />
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
                        borderRadius: 20,
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
          <View style={styles.buttonBody}>
            <AppButton
              colorScheme="teal"
              onPress={() => navigation.navigate(screenName.FEEDBACK_IMPRESSIONS)}
            >
              Continue to share your thoughts
            </AppButton>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default RequestFeedbackProfile;
