import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { NavigationScreenType } from "src/types/globals";
import { RatingSlider } from "src/components/molecule/RatingSlider";
import { styles } from "./style";
import { Input } from "src/components/atoms/Input";
import { Button } from "src/components/atoms/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "src/styles";

import { VOTES } from "../routes";
import { selectUserMatches } from "src/store/features/UserMatchesSlice";
import { useAppSelector } from "src/store/hooks";
import { storage } from "src/helpers/storage";
import { STORAGE } from "src/navigations/utils/CONSTANTS";
import { useMutation } from "@apollo/client";
import { SAVE_GROUP_RATING } from "src/graphql/profile/mutations";
import { selectUser } from "src/store/features/UserProfileSlice";
import { Spacing, Typography } from "src/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { logEvent, onScreenView } from "src/analytics";
import { eventNames, screenClass, screenNames } from "src/analytics/constants";

export const VisualVote = ({ navigation }: NavigationScreenType) => {
  const reduxUser = useAppSelector(selectUser);
  const userId = reduxUser?.userId;

  const [type1, setType1] = useState<number>(0.5);
  const [type2, setType2] = useState<number>(0.5);
  const [type3, setType3] = useState<number>(0.5);
  const [comment, setComment] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const userMatches = useAppSelector(selectUserMatches);

  const visual = userMatches[0].visual;
  const photoCriteria = useAppSelector((state) =>
    state.userMatches.criterias.filter(
      (criteria: any) => criteria.type === "user_visuals"
    )
  );

  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const ratingGroupInput = {
    raterId: userId,
    contentId: visual?.id,
    type: "user_visual",
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
        criteriaId: photoCriteria[0]?.id,
        rating: type1,
      },
      {
        criteriaId: photoCriteria[1]?.id,
        rating: type2,
      },
      {
        criteriaId: photoCriteria[2]?.id,
        rating: type3,
      },
    ],
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
  };

  useEffect(() => {
    onScreenView({
      screenName: screenNames.ratePhoto,
      screenType: screenClass.matches,
    });
  }, []);
  const [saveGroupRating] = useMutation(SAVE_GROUP_RATING, {
    variables: { ratingGroupInput },
    onCompleted: (data) => {
      setLoading(false);
      navigation.navigate(VOTES.PROFILE_VIEW_VOTE);
    },
    onError: (error) => {
      setLoading(false);
    },
  });

  return (
    <LinearGradient style={{ flex: 1 }} colors={gradient}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{
            width: "100%",
            height: 400,
            resizeMode: "cover",
          }}
          source={{
            uri: visual?.videoOrPhoto,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 130,
              flex: 1,
            }}
          >
            <View style={styles.sliderContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{photoCriteria[0]?.title}: </Text>
                <Text style={styles.smallText}>
                  {photoCriteria[0]?.description}
                </Text>
              </View>
              <RatingSlider rating={setType1} />
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{photoCriteria[1]?.title}: </Text>
                <Text style={styles.smallText}>
                  {photoCriteria[1]?.description}
                </Text>
              </View>
              <RatingSlider rating={setType2} />
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{photoCriteria[2]?.title}:</Text>
                <Text style={styles.smallText}>
                  {" "}
                  {photoCriteria[2]?.description}{" "}
                </Text>
              </View>
              <RatingSlider rating={setType3} />
            </View>
            {/* <Input
            label='Comments'
            onChangeText={(e) => {
              setComment(e)
            }}
          /> */}
            <TextInput
              placeholder="Comments"
              style={{
                borderWidth: 4,
                width: "100%",
                borderRadius: Spacing.SCALE_8,
                padding: Spacing.SCALE_12,
                borderColor: Colors.INPUT_BORDER,
                backgroundColor: Colors.INPUT_BG,
                fontFamily: Typography.FONT_POPPINS_REGULAR,
                fontSize: Typography.FONT_SIZE_16,
                marginTop: Spacing.SCALE_8,
                overflow: "hidden",
                shadowColor: "black",
                shadowOffset: {
                  width: 9,
                  height: 1,
                },
                shadowOpacity: 0.15,
                shadowRadius: 14,

                elevation: -8,
              }}
              value={comment}
              onChangeText={(e) => {
                setComment(e);
              }}
            />
            <Button
              // disabled={type1 === 0.5 || type2 === 0.5 || type3 === 0.5}
              spinner={loading}
              title="Next"
              onPress={() => {
                setLoading(true);
                saveGroupRating();
                logEvent({
                  eventName: eventNames.submit_photo_rating_button,
                  params: {
                    userId,
                    screenClass: screenClass.matches,
                    ...ratingGroupInput.ratingDetails,
                  },
                });
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};
