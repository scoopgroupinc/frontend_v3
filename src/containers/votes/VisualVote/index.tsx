import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
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
import { Colors } from "../../../utils";
import { SAVE_GROUP_RATING } from "../../../services/graphql/profile/mutations";
import { styles } from "./style";
import { RatingSlider } from "../../../components/molecule/RatingSlider";
import { AppInput } from "../../../components/atoms/AppInput";

export function VisualVote() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;

  const [type1, setType1] = useState<number>(0.5);
  const [type2, setType2] = useState<number>(0.5);
  const [type3, setType3] = useState<number>(0.5);
  const [comment, setComment] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const userChoices = useAppSelector(selectUserChoices);

  const {visual} = userChoices[0];
  const photoCriteria = useAppSelector((state) =>
    state.matches.criterias.filter((criteria: any) => criteria.type === "user_visuals")
  );

  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const ratingGroupInput = {
    raterId: userId,
    contentId: visual?.id,
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
    onCompleted: (data) => {
      setLoading(false);
      navigation.navigate(screenName.PROFILE_VIEW);
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
            {/* <Input
            label='Comments'
            onChangeText={(e) => {
              setComment(e)
            }}
          /> */}
            <AppInput
              placeholder="Comments"
              // style={{
              //   borderWidth: 4,
              //   width: '100%',
              //   borderRadius: Spacing.SCALE_8,
              //   padding: Spacing.SCALE_12,
              //   borderColor: Colors.INPUT_BORDER,
              //   backgroundColor: Colors.INPUT_BG,
              //   fontFamily: Typography.FONT_POPPINS_REGULAR,
              //   fontSize: Typography.FONT_SIZE_16,
              //   marginTop: Spacing.SCALE_8,
              //   overflow: 'hidden',
              //   shadowColor: 'black',
              //   shadowOffset: {
              //     width: 9,
              //     height: 1,
              //   },
              //   shadowOpacity: 0.15,
              //   shadowRadius: 14,

              //   elevation: -8,
              // }}
              value={comment}
              onChangeText={(e) => {
                setComment(e);
              }}
            />
            <AppButton
              // disabled={type1 === 0.5 || type2 === 0.5 || type3 === 0.5}
              title="Next"
              onPress={() => {
                setLoading(true);
                saveGroupRating();
                // logEvent({
                //   eventName: eventNames.submit_photo_rating_button,
                //   params: {
                //     userId,
                //     screenClass: screenClass.matches,
                //     ...ratingGroupInput.ratingDetails,
                //   },
                // });
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}
