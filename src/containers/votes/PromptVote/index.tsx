import React, { useEffect, useState } from "react";
import { View, Text, Platform, TextInput } from "react-native";
import { NavigationScreenType } from "src/types/globals";
import { styles } from "./style";
import { Colors } from "src/styles";
import { Spacing } from "src/styles";
import { BackgroundImage } from "./utils";
import { GradientLayout } from "src/components/layout/GradientLayout";
import { QuotedText } from "src/components/atoms/QuotedText";
import Tooltip from "react-native-walkthrough-tooltip";
import { Slider } from "@miblanchard/react-native-slider";
import { Button } from "src/components/atoms/Button";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { VOTES } from "../routes";
import {
  selectUserMatches,
  setUserMatchImages,
  setUserMatchPrompts,
} from "src/store/features/UserMatchesSlice";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { URLS } from "src/services/utils/CONSTANTS";
import { RatingSlider } from "src/components/molecule/RatingSlider";
import { GetPromptsOrderType } from "src/types";
import { GET_PROMPTS_ORDER } from "src/graphql/profile/queries";
import { SAVE_GROUP_RATING } from "src/graphql/profile/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { storage } from "src/helpers/storage";
import { STORAGE } from "src/navigations/utils/CONSTANTS";
import { selectUser } from "src/store/features/UserProfileSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "src/components/atoms/Input";
import { Typography } from "src/styles";
import { logEvent, onScreenView } from "src/analytics";
import { eventNames, screenClass, screenNames } from "src/analytics/constants";

interface IRatingDetails {
  criteriaId: string;
  rating: number;
}

interface IRatingCommentInput {
  comment: string;
}
interface IRatingInput {
  raterId: string;
  contentId: string;
  type: string;
  comment: IRatingCommentInput[];
  ratingDetails: IRatingDetails[];
  startTime: string;
  endTime: string;
}

const initialRatingData: IRatingInput = {
  raterId: "",
  contentId: "",
  type: "",
  comment: [],
  ratingDetails: [],
  startTime: "",
  endTime: "",
};

export const PromptVote = ({ navigation }: NavigationScreenType) => {
  const reduxUser = useAppSelector(selectUser);
  const userId = reduxUser?.userId;

  const [type1, setType1] = useState<number>(0.5);
  const [type2, setType2] = useState<number>(0.5);
  const [type3, setType3] = useState<number>(0.5);

  const [loading, setLoading] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");

  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const dispatch = useAppDispatch();
  const userMatches = useAppSelector(selectUserMatches);

  const userMatchId = userMatches[0]?.shownUserId;
  const prompt = userMatches[0]?.prompt;
  const promptCriteria = useAppSelector((state) =>
    state.userMatches.criterias.filter(
      (criteria: any) => criteria.type === "user_prompts"
    )
  );

  const ratingGroupInput = {
    raterId: userId,
    contentId: prompt?.id,
    type: "prompt",
    comment: [
      {
        ratingGroupId: "",
        comment: comment,
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        final: true,
      },
    ],
    ratingDetails: [
      {
        criteriaId: promptCriteria[0]?.id,
        rating: type1,
      },
      {
        criteriaId: promptCriteria[1]?.id,
        rating: type2,
      },
      {
        criteriaId: promptCriteria[2]?.id,
        rating: type3,
      },
    ],
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
  };

  const [saveGroupRating] = useMutation(SAVE_GROUP_RATING, {
    variables: { ratingGroupInput },
    onCompleted: (data) => {
      setLoading(false);
      setComment("");
      navigation.navigate(VOTES.VISUAL_VOTE);
    },
    onError: (error) => {
      setLoading(false);
    },
  });

  const userPromptsOrder = {
    userId: userMatchId,
  };

  const { data: promptsOrderResult, loading: promptsOrderLoading } = useQuery<
    GetPromptsOrderType | undefined
  >(GET_PROMPTS_ORDER, {
    variables: {
      userPromptsOrder,
    },
  });

  const quote = {
    title: `${prompt?.prompt}...`,
    text: `"${prompt?.answer}"`,
  };

  //load images for the next screen
  const fetchMatchVisuals = async () => {
    await fetch(`${URLS.FILE_URL}/api/v1/visuals/${userMatchId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          dispatch(
            setUserMatchImages({
              userMatchImages: res,
            })
          );
        }
      })
      .catch((err) => {});
  };

  //load prompts for the profile view screen
  const fetchPromptsOrder = async () => {
    if (promptsOrderLoading) return null;

    let promptsOrder = promptsOrderResult?.getUserPromptsOrder;

    if (promptsOrder && promptsOrder.length > 0) {
      dispatch(
        setUserMatchPrompts({
          promptsOrder,
        })
      );
    }
  };

  useEffect(() => {
    fetchMatchVisuals();
    onScreenView({
      screenName: screenNames.ratePrompt,
      screenType: screenClass.matches,
    });
  }, [prompt]);

  useEffect(() => {
    fetchPromptsOrder();
  }, [promptsOrderResult]);

  const [showTip, setTip] = useState(true);

  return (
    <LinearGradient style={{ flex: 1 }} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <ScrollView style={{ padding: 20 }}>
            <View
              style={{
                marginBottom: 130,
                flex: 1,
              }}
            >
              <View style={{ marginTop: Spacing.SCALE_8 }} />
              <Text style={styles.title}>Give Feedback</Text>
              <QuotedText {...quote} />
              <View style={{ width: "100%" }}>
                <View style={styles.sliderContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      {promptCriteria[0]?.title}:{" "}
                    </Text>
                    <Text style={styles.smallText}>
                      {promptCriteria[0]?.description}
                    </Text>
                  </View>
                  <RatingSlider rating={setType1} />
                </View>
                <View style={styles.sliderContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>
                      {promptCriteria[1]?.title}:{" "}
                    </Text>
                    <Text style={styles.smallText}>
                      Authentic, Glimpse of person
                    </Text>
                  </View>
                  <RatingSlider rating={setType2} />
                </View>
                <View style={styles.sliderContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{promptCriteria[2]?.title}:</Text>
                    <Text style={styles.smallText}>
                      {" "}
                      Positive, Interesting, Funny{" "}
                    </Text>
                  </View>
                  <RatingSlider rating={setType3} />
                </View>
                <TextInput
                  placeholder="Comments"
                  style={styles.input}
                  value={comment}
                  onChangeText={(e) => {
                    setComment(e);
                  }}
                />
                <Button
                  title="Next"
                  spinner={loading}
                  disabled={type1 === 0.5 || type2 === 0.5 || type3 === 0.5}
                  onPress={() => {
                    setLoading(true);
                    saveGroupRating();
                    logEvent({
                      eventName: eventNames.submitPromptRatingButton,
                      params: {
                        userId,
                        screenClass: screenClass.matches,
                        ...ratingGroupInput.ratingDetails,
                      },
                    });
                  }}
                />
                <Text style={styles.smallText}>
                  Give constructive feedback and help your Scoop friend with his
                  profile!
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
