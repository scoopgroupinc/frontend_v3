import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userSlice";
import { Colors, Spacing } from "../../../utils";
import { SAVE_GROUP_RATING } from "../../../services/graphql/profile/mutations";
import { screenName } from "../../../utils/constants";
import { GET_PROMPTS_ORDER } from "../../../services/graphql/profile/queries";
import { URLS } from "../../../utils/constants/apis";
import { QuotedText } from "../../../components/atoms/QuotedText";
import { styles } from "./style";
import { AppButton } from "../../../components/atoms/AppButton";
import { RatingSlider } from "../../../components/molecule/RatingSlider";
import { AppInput } from "../../../components/atoms/AppInput";
import {
  selectUserChoices,
  setUserMatchImages,
  setUserMatchPrompts,
} from "../../../store/features/matches/matchSlice";

export const PromptVote = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;

  const [type1, setType1] = useState<number>(0.5);
  const [type2, setType2] = useState<number>(0.5);
  const [type3, setType3] = useState<number>(0.5);

  const [loading, setLoading] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");

  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const dispatch = useAppDispatch();
  const userChoices = useAppSelector(selectUserChoices);

  const userChoiceId = userChoices[0]?.shownUserId;
  const userChoicePrompt = userChoices[0]?.prompt;
  const promptCriteria = useAppSelector((state) =>
    state.matches.criterias.filter((criteria: any) => criteria.type === "user_prompts")
  );

  const ratingGroupInput = {
    raterId: userId,
    contentId: userChoicePrompt?.id,
    type: "prompt",
    comment: [
      {
        ratingGroupId: "",
        comment,
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
      navigation.navigate(screenName.VISUAL_VOTE);
    },
    onError: (error) => {
      setLoading(false);
    },
  });

  const userPromptsOrder = {
    userId: userChoiceId,
  };

  const { data: promptsOrderResult, loading: promptsOrderLoading } = useQuery(GET_PROMPTS_ORDER, {
    variables: {
      userPromptsOrder,
    },
  });

  const quote = {
    title: `${userChoicePrompt?.prompt}...`,
    text: `"${userChoicePrompt?.answer}"`,
  };

  // load images for the next screen
  const fetchMatchVisuals = async () => {
    await fetch(`${URLS.FILE_URL}/api/v1/visuals/${userChoiceId}`, {
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

  // load prompts for the profile view screen
  const fetchPromptsOrder = async () => {
    if (promptsOrderLoading) return null;

    const promptsOrder = promptsOrderResult?.getUserPromptsOrder;

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
    // onScreenView({
    //   screenName:screenNames.ratePrompt,
    //   screenType:screenClass.matches,
    //  })
  }, [userChoicePrompt]);

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
                    <Text style={styles.text}>{promptCriteria[0]?.title}: </Text>
                    <Text style={styles.smallText}>{promptCriteria[0]?.description}</Text>
                  </View>
                  <RatingSlider rating={setType1} />
                </View>
                <View style={styles.sliderContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{promptCriteria[1]?.title}: </Text>
                    <Text style={styles.smallText}>Authentic, Glimpse of person</Text>
                  </View>
                  <RatingSlider rating={setType2} />
                </View>
                <View style={styles.sliderContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{promptCriteria[2]?.title}:</Text>
                    <Text style={styles.smallText}> Positive, Interesting, Funny </Text>
                  </View>
                  <RatingSlider rating={setType3} />
                </View>
                <AppInput
                  placeholder="Comments"
                  value={comment}
                  onChangeText={(e) => {
                    setComment(e);
                  }}
                />
                <AppButton
                  title="Next"
                  disabled={type1 === 0.5 || type2 === 0.5 || type3 === 0.5}
                  onPress={() => {
                    setLoading(true);
                    saveGroupRating();
                    // logEvent({
                    //   eventName: eventNames.submitPromptRatingButton,
                    //   params:{
                    //     userId,
                    //     screenClass:screenClass.matches,
                    //     ...ratingGroupInput.ratingDetails,}
                    // })
                  }}
                />
                <Text style={styles.smallText}>
                  Give constructive feedback and help your Scoop friend with his profile!
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
