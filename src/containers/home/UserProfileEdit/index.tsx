/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "react-native-svg";
import { useMutation } from "@apollo/client";
import { ScrollableGradientLayout } from "../../../components/layouts/ScrollableGradientLayout";
import { MediaContainer } from "../../../components/molecule/MediaContainer";
import {
  selectUser,
  selectUserProfile,
  selectUserVisuals,
} from "../../../store/features/user/userSlice";
import { useAppSelector } from "../../../store/hooks";
import { screenName } from "../../../utils/constants";
import { styles } from "./styles";
import { AppInput } from "../../../components/atoms/AppInput";
import { EditPromptList } from "../../../features/Prompt/components/EditPromptList";
import { ORIGIN } from "../../../features/Prompt/constants";
import { useUploadVisuals } from "../../../hooks/useUploadVisual";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { AppButton } from "../../../components/atoms/AppButton";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { Colors } from "../../../utils";
import { useShare } from "../../../hooks/useShare";
import { GET_USER_SHARE_PROFILE_LINK } from "../../../services/graphql/user-link/mutations";
import { encryptData } from "../../../utils/helpers";

const inputTextProps = {
  editable: false,
};

export const UserProfileEdit = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const userVisuals = useAppSelector(selectUserVisuals);
  const userProfile = useAppSelector(selectUserProfile);
  const [loading, setIsLoading] = useState<boolean>(false);

  const { share } = useShare();
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;
  const [shareLink, setShareLink] = useState<any>(null);

  const [getShareLink] = useMutation(GET_USER_SHARE_PROFILE_LINK);
  useEffect(() => {
    getShareLink({
      variables: {
        userId,
      },
    }).then((res) => {
      const link = res.data.getUserShareProfileLink;
      setShareLink(link);
    });
  }, [getShareLink, userId]);

  const shareLinkToSocialMedia = () => {
    const cipherLink = encryptData(shareLink);
    share(cipherLink);
  };

  const insets = useSafeAreaInsets();

  const [handleUploadImages, isUploading] = useUploadVisuals();

  const onAddImage = async (image) => {
    handleUploadImages(image);
  };

  useEffect(() => {
    setIsLoading(isUploading);
  }, [isUploading]);

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <ScrollableGradientLayout safe={false}>
        <View
          style={{
            marginTop: insets.top,
            marginBottom: 20,
          }}
        >
          <View style={styles.mediaBox}>
            <Text style={styles.mediaHeader}>Photos</Text>
            <MediaContainer images={userVisuals} onAddImage={onAddImage} />
          </View>
          <View style={styles.mediaContainer}>
            <EditPromptList origin={ORIGIN.PROFILE} />
          </View>
          <View
            style={{
              marginBottom: "25%",
            }}
          >
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "relationship_goal")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={
                userProfile?.find((item: any) => item.tagType === "relationship_goal")?.visible
              }
              label="Relationship Goals"
              placeholder="Long Term, Short Term, Casual, Friends With Benefits"
              onPressIn={() => {
                navigation.navigate(screenName.RELATIONSHIP_GOALS, {
                  currentTagType: "relationship_goal",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "parenting_goal")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "parenting_goal")?.visible}
              label="Parenting Goals"
              placeholder="Have Kids, Want Kids, Don’t Want Kids"
              onPressIn={() => {
                navigation.navigate(screenName.PARENTING_GOALS, {
                  currentTagType: "parenting_goal",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              visible={userProfile?.find((item: any) => item.tagType === "homeTown")?.visible}
              value={
                userProfile?.find((item: any) => item.tagType === "homeTown")?.userTags[0]?.tagName
              }
              label="Hometown"
              placeholder="New York, NY"
              onPressIn={() => {
                navigation.navigate(screenName.HOMETOWN, {
                  currentTagType: "homeTown",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "ethnicity")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "ethnicity")?.visible}
              label="Ethnicity"
              placeholder="Asian, Black/African, Hispanic/Latinx, White/Caucasian"
              onPressIn={() => {
                navigation.navigate(screenName.ETHNICITY, {
                  currentTagType: "ethnicity",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              onChangeText={(text: string) => {
                userProfile?.map((item: any) => {
                  const { tagType, userTags } = item;
                  if (tagType === "job") {
                    return {
                      tagType,
                      userTags: [{ tagName: text }],
                    };
                  }
                  return {
                    tagType,
                    userTags,
                  };
                });
              }}
              _typeOf="tag_field"
              visible={userProfile?.find((item: any) => item.tagType === "job")?.visible}
              value={
                userProfile?.find((item: any) => item.tagType === "job")?.userTags?.[0]?.tagName
              }
              label="Job Title"
              placeholder="Founder & CEO"
              {...inputTextProps}
              onPressIn={() => {
                navigation.navigate(screenName.JOB_TITLE, {
                  currentTagType: "job",
                });
              }}
            />
            <AppInput
              _typeOf="tag_field"
              visible={userProfile?.find((item: any) => item.tagType === "company")?.visible}
              value={
                userProfile?.find((item: any) => item.tagType === "company")?.userTags[0]?.tagName
              }
              label="Company"
              placeholder="Scoop LLC"
              onPressIn={() => {
                navigation.navigate(screenName.COMPANY, {
                  currentTagType: "company",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              visible={userProfile?.find((item: any) => item.tagType === "school")?.visible}
              value={
                userProfile?.find((item: any) => item.tagType === "school")?.userTags[0]?.tagName
              }
              label="School"
              placeholder="University of Michigan"
              onPressIn={() => {
                navigation.navigate(screenName.SCHOOL, {
                  currentTagType: "school",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "education")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "education")?.visible}
              label="Education Level"
              placeholder="Graduate"
              onPressIn={() => {
                navigation.navigate(screenName.EDUCATION_LEVEL, {
                  currentTagType: "education",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "religion")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "religion")?.visible}
              label="Religion"
              placeholder="Christianity, Judaism, Islam, Buddhism, Hinduism"
              onPressIn={() => {
                navigation.navigate(screenName.RELIGIONS, {
                  currentTagType: "religion",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "religious_practice")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={
                userProfile?.find((item: any) => item.tagType === "religious_practice")?.visible
              }
              label="Religious Practice"
              placeholder="Active, Somewhat Active, Not Active"
              onPressIn={() => {
                navigation.navigate(screenName.RELIGIOUS_PRACTICES, {
                  currentTagType: "religious_practice",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "zodiac")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "zodiac")?.visible}
              label="Zodiac Sign"
              placeholder="Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces"
              onPressIn={() => {
                navigation.navigate(screenName.ZODIAC, {
                  currentTagType: "zodiac",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "meyer_briggs")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "meyer_briggs")?.visible}
              label="Meyer Briggs"
              placeholder="ISTJ, ISFJ, INFJ, INTJ, ISTP, ISFP, INFP, INTP, ESTP, ESFP, ENFP, ENTP, ESTJ, ESFJ, ENFJ, ENTP"
              onPressIn={() => {
                navigation.navigate(screenName.MEYER_BRIGGS, {
                  currentTagType: "meyer_briggs",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "politics")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "politics")?.visible}
              label="Politics"
              placeholder="Apolitical"
              onPressIn={() => {
                navigation.navigate(screenName.POLITICS, {
                  currentTagType: "politics",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "diet")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "diet")?.visible}
              label="Diet"
              placeholder="Vegetarian, Vegan, Gluten-Free, Dairy-Free, Kosher"
              onPressIn={() => {
                navigation.navigate(screenName.DIET, {
                  currentTagType: "diet",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "drink")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "drink")?.visible}
              label="Drink"
              placeholder="Yes"
              onPressIn={() => {
                navigation.navigate(screenName.DRINK, {
                  currentTagType: "drink",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "smoking")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "smoking")?.visible}
              label="Smoking"
              placeholder="Yes"
              onPressIn={() => {
                navigation.navigate(screenName.SMOKING, {
                  currentTagType: "smoking",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "alcohol_usage")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "alcohol_usage")?.visible}
              label="Alcohol"
              placeholder="Yes"
              onPressIn={() => {
                navigation.navigate(screenName.ALCOHOL, {
                  currentTagType: "alcohol_usage",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "cannibis_usage")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "cannibis_usage")?.visible}
              label="Cannabis"
              placeholder="Yes"
              onPressIn={() => {
                navigation.navigate(screenName.CANNABIS, {
                  currentTagType: "cannibis_usage",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "drug_usage")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "drug_usage")?.visible}
              label="Drugs"
              placeholder="Yes"
              onPressIn={() => {
                navigation.navigate(screenName.DRUGS, {
                  currentTagType: "drug_usage",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "language")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "language")?.visible}
              label="Languages"
              placeholder="English, Spanish, French, German, Italian"
              onPressIn={() => {
                navigation.navigate(screenName.LANGUAGES, {
                  currentTagType: "language",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "music_genre")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "music_genre")?.visible}
              label="Music Genres"
              placeholder="Pop, Rock, Hip-Hop, R&B, Country"
              onPressIn={() => {
                navigation.navigate(screenName.MUSIC_GENRES, {
                  currentTagType: "music_genre",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "book_genre")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "book_genre")?.visible}
              label="Book Genres"
              placeholder="Fiction, Non-Fiction, Romance, Mystery, Thriller"
              onPressIn={() => {
                navigation.navigate(screenName.BOOK_GENRES, {
                  currentTagType: "book_genre",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "pets")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "pets")?.visible}
              label="Pets"
              placeholder="Dog, Cat, Fish, Bird, Reptile"
              onPressIn={() => {
                navigation.navigate(screenName.PETS, {
                  currentTagType: "pets",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "physical_activity")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={
                userProfile?.find((item: any) => item.tagType === "physical_activity")?.visible
              }
              label="Sports"
              placeholder="Basketball, Football, Soccer, Tennis, Volleyball"
              onPressIn={() => {
                navigation.navigate(screenName.SPORTS, {
                  currentTagType: "physical_activity",
                });
              }}
              {...inputTextProps}
            />

            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "going_out")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "going_out")?.visible}
              label="Going Out"
              placeholder="Bars, Clubs, Concerts, Movies, Sports"
              onPressIn={() => {
                navigation.navigate(screenName.GOING_OUT, {
                  currentTagType: "going_out",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "staying_in")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "staying_in")?.visible}
              label="Staying In"
              placeholder="Watching TV, Cooking, Reading, Gaming, Bingeing"
              onPressIn={() => {
                navigation.navigate(screenName.STAYING_IN, {
                  currentTagType: "staying_in",
                });
              }}
              {...inputTextProps}
            />
            <AppInput
              _typeOf="tag_field"
              value={userProfile
                ?.find((item: any) => item.tagType === "creative")
                ?.userTags.map((item: any) => item.tagName)
                .join(", ")}
              visible={userProfile?.find((item: any) => item.tagType === "creative")?.visible}
              label="Creative Outlet"
              placeholder="Writing, Painting, Photography, Music, Film"
              onPressIn={() => {
                navigation.navigate(screenName.CREATIVE_OUTLET, {
                  currentTagType: "creative",
                });
              }}
              {...inputTextProps}
            />
          </View>
        </View>
      </ScrollableGradientLayout>
      <View style={{ backgroundColor: Colors.TEAL, padding: 20 }}>
        <AppButton colorScheme="coolGray" onPress={shareLinkToSocialMedia}>
          Share Profile Link
        </AppButton>
      </View>
    </>
  );
};
