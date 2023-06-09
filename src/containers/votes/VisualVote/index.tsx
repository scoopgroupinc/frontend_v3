/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@apollo/client";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppButton } from "../../../components/atoms/AppButton";
import { screenName } from "../../../utils/constants";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userSlice";
import { selectUserChoices } from "../../../store/features/matches/matchSlice";
import { Colors, Spacing } from "../../../utils";
import { SAVE_GROUP_RATING } from "../../../services/graphql/profile/mutations";
import { styles } from "./style";
import { RatingSlider } from "../../../components/molecule/RatingSlider";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";

const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

export const VisualVote = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;

  const [type1, setType1] = useState<number>(0.5);
  const [type2, setType2] = useState<number>(0.5);
  const [type3, setType3] = useState<number>(0.5);
  const [comment, setComment] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const userChoices = useAppSelector(selectUserChoices);

  const { visual } = userChoices[0];
  const photoCriteria = useAppSelector((state) =>
    state.matches.criterias.filter((criteria) => criteria.type === "user_visuals")
  );

  const ratingGroupInput = {
    raterId: userId,
    contentId: visual !== null ? visual?.id : "",
    type: "user_visual",
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
    // onScreenView({
    //   screenName:screenNames.ratePhoto,
    //   screenType:screenClass.matches,
    //  })
  }, []);
  const [saveGroupRating] = useMutation(SAVE_GROUP_RATING, {
    variables: { ratingGroupInput },
    onCompleted: () => {
      setComment("");
      setLoading(false);
      navigation.navigate(screenName.PROFILE_VIEW);
    },
    onError: () => {
      setLoading(false);
    },
  });

  return (
    <>
      <AppActivityIndicator visible={loading} />
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
                  <Text style={styles.smallText}>{photoCriteria[0]?.description}</Text>
                </View>
                <RatingSlider rating={setType1} />
              </View>
              <View style={styles.sliderContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{photoCriteria[1]?.title}: </Text>
                  <Text style={styles.smallText}>{photoCriteria[1]?.description}</Text>
                </View>
                <RatingSlider rating={setType2} />
              </View>
              <View style={styles.sliderContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{photoCriteria[2]?.title}:</Text>
                  <Text style={styles.smallText}> {photoCriteria[2]?.description} </Text>
                </View>
                <RatingSlider rating={setType3} />
              </View>
              {/* Text Input */}
              <View style={{ marginTop: Spacing.SCALE_8, marginBottom: Spacing.SCALE_12 }}>
                <Text style={styles.label}>Comments</Text>
                <TextInput
                  value={comment}
                  onChangeText={(e) => setComment(e)}
                  style={[styles.input]}
                />
              </View>
              <AppButton
                // isDisabled={type1 === 0.5 || type2 === 0.5 || type3 === 0.5}
                onPress={() => {
                  setLoading(true);
                  // saveGroupRating();
                  navigation.navigate(screenName.PROFILE_VIEW);
                  // logEvent({
                  //   eventName: eventNames.submit_photo_rating_button,
                  //   params: {
                  //     userId,
                  //     screenClass: screenClass.matches,
                  //     ...ratingGroupInput.ratingDetails,
                  //   },
                  // });
                }}
              >
                Next
              </AppButton>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </>
  );
};
