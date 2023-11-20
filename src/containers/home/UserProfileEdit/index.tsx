/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MediaContainer } from "../../../components/molecule/MediaContainer";
import {
  selectUserLocation,
  selectUserTags,
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
import { Colors } from "../../../utils";
import { TAG_VISIBLE_TYPES } from "../../../utils/types/TAGS";
import { useGetShareLink } from "../../../hooks/useGetShareLink";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { getStringData, storeStringData } from "../../../utils/storage";

const inputTextProps = {
  editable: false,
};

const ShareModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [checkbox, setCheckbox] = useState(false);

  const handleCheckboxToggle = () => {
    setCheckbox(!checkbox);
    storeStringData("shareLinkAlert", checkbox ? "false" : "true");
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: 300,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.RUST,
            }}
          >
            <Text style={{ alignSelf: "center", fontSize: 16 }}>Share Profile Link</Text>
            <Text style={{ marginBottom: 20, marginTop: 10 }}>
              Once you recieve feedback, you can see it in the main view.
            </Text>

            <TouchableOpacity onPress={() => handleCheckboxToggle()}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "black",
                    marginRight: 10,
                    backgroundColor: checkbox ? Colors.TEAL : "white",
                  }}
                />
                <Text>Don't show again</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={{ alignSelf: "center" }}>
              <Text style={{ color: Colors.RUST, marginTop: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export const UserProfileEdit = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const userVisuals = useAppSelector(selectUserVisuals);
  const userTags = useAppSelector(selectUserTags);
  const userLocation = useAppSelector(selectUserLocation);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shareLinkToSocialMedia] = useGetShareLink();

  const insets = useSafeAreaInsets();

  const [handleUploadImages, isUploading] = useUploadVisuals();

  const onAddImage = async (image: any) => {
    handleUploadImages(image);
  };

  useEffect(() => {
    setIsLoading(isUploading);
  }, [isUploading]);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = async () => {
    const alertState = await getStringData("shareLinkAlert");
    if (alertState) {
      setModalVisible(false);
      shareLinkToSocialMedia();
    } else {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    shareLinkToSocialMedia();
  };

  return (
    <>
      <AppActivityIndicator visible={isLoading} />
      <GradientLayout>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View
            style={{
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
                label="City"
                value={userLocation?.addressLine1}
                placeholder="Search for Address"
                onPressIn={() => {
                  navigation.navigate(screenName.ADDRESS);
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.relationship_goal]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.relationship_goal]?.visible}
                label="Relationship Goals"
                placeholder="Long Term, Short Term, Casual, Friends With Benefits"
                onPressIn={() => {
                  navigation.navigate(screenName.RELATIONSHIP_GOALS, {
                    currentTagType: TAG_VISIBLE_TYPES.relationship_goal,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.parenting_goal]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.parenting_goal]?.visible}
                label="Children"
                placeholder="Have and want more"
                onPressIn={() => {
                  navigation.navigate(screenName.PARENTING_GOALS, {
                    currentTagType: TAG_VISIBLE_TYPES.parenting_goal,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                visible={userTags[TAG_VISIBLE_TYPES.home_town]?.visible}
                value={userTags[TAG_VISIBLE_TYPES.home_town]?.userTags[0]?.tagName}
                label="Hometown"
                placeholder="New York, NY"
                onPressIn={() => {
                  navigation.navigate(screenName.HOMETOWN, {
                    currentTagType: TAG_VISIBLE_TYPES.home_town,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.ethnicity]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.ethnicity]?.visible}
                label="Ethnicity"
                placeholder="Asian, Black/African, Hispanic/Latinx, White/Caucasian"
                onPressIn={() => {
                  navigation.navigate(screenName.ETHNICITY, {
                    currentTagType: TAG_VISIBLE_TYPES.ethnicity,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                onChangeText={(text: string) => {
                  userTags?.map((item: any) => {
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
                visible={userTags[TAG_VISIBLE_TYPES.job]?.visible}
                value={userTags[TAG_VISIBLE_TYPES.job]?.userTags?.[0]?.tagName}
                label="Job Title"
                placeholder="Founder & CEO"
                {...inputTextProps}
                onPressIn={() => {
                  navigation.navigate(screenName.JOB_TITLE, {
                    currentTagType: TAG_VISIBLE_TYPES.job,
                  });
                }}
              />
              <AppInput
                _typeOf="tag_field"
                visible={userTags[TAG_VISIBLE_TYPES.company]?.visible}
                value={userTags[TAG_VISIBLE_TYPES.company]?.userTags[0]?.tagName}
                label="Company"
                placeholder="Scoop LLC"
                onPressIn={() => {
                  navigation.navigate(screenName.COMPANY, {
                    currentTagType: TAG_VISIBLE_TYPES.company,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                visible={userTags[TAG_VISIBLE_TYPES.school]?.visible}
                value={userTags[TAG_VISIBLE_TYPES.school]?.userTags[0]?.tagName}
                label="School"
                placeholder="University of Michigan"
                onPressIn={() => {
                  navigation.navigate(screenName.SCHOOL, {
                    currentTagType: TAG_VISIBLE_TYPES.school,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.education]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.school]?.visible}
                label="Education Level"
                placeholder="Graduate"
                onPressIn={() => {
                  navigation.navigate(screenName.EDUCATION_LEVEL, {
                    currentTagType: TAG_VISIBLE_TYPES.education,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.religion]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.religion]?.visible}
                label="Religion"
                placeholder="Christianity, Judaism, Islam, Buddhism, Hinduism"
                onPressIn={() => {
                  navigation.navigate(screenName.RELIGIONS, {
                    currentTagType: TAG_VISIBLE_TYPES.religion,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.religious_practice]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.religious_practice]?.visible}
                label="Religious Practice"
                placeholder="Active, Somewhat Active, Not Active"
                onPressIn={() => {
                  navigation.navigate(screenName.RELIGIOUS_PRACTICES, {
                    currentTagType: TAG_VISIBLE_TYPES.religious_practice,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.zodiac]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.zodiac]?.visible}
                label="Zodiac Sign"
                placeholder="Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces"
                onPressIn={() => {
                  navigation.navigate(screenName.ZODIAC, {
                    currentTagType: TAG_VISIBLE_TYPES.zodiac,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.meyer_briggs]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.meyer_briggs]?.visible}
                label="Meyer Briggs"
                placeholder="ISTJ, ISFJ, INFJ, INTJ, ISTP, ISFP, INFP, INTP, ESTP, ESFP, ENFP, ENTP, ESTJ, ESFJ, ENFJ, ENTP"
                onPressIn={() => {
                  navigation.navigate(screenName.MEYER_BRIGGS, {
                    currentTagType: TAG_VISIBLE_TYPES.meyer_briggs,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.politics]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.politics]?.visible}
                label="Politics"
                placeholder="Apolitical"
                onPressIn={() => {
                  navigation.navigate(screenName.POLITICS, {
                    currentTagType: TAG_VISIBLE_TYPES.politics,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.diet]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.diet]?.visible}
                label="Diet"
                placeholder="Vegetarian, Vegan, Gluten-Free, Dairy-Free, Kosher"
                onPressIn={() => {
                  navigation.navigate(screenName.DIET, {
                    currentTagType: TAG_VISIBLE_TYPES.diet,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.drink]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.drink]?.visible}
                label="Drink"
                placeholder="Yes"
                onPressIn={() => {
                  navigation.navigate(screenName.DRINK, {
                    currentTagType: TAG_VISIBLE_TYPES.drink,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.smoking_usage]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.smoking_usage]?.visible}
                label="Smoking"
                placeholder="Yes"
                onPressIn={() => {
                  navigation.navigate(screenName.SMOKING, {
                    currentTagType: TAG_VISIBLE_TYPES.smoking_usage,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.alcohol_usage]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.alcohol_usage]?.visible}
                label="Alcohol"
                placeholder="Yes"
                onPressIn={() => {
                  navigation.navigate(screenName.ALCOHOL, {
                    currentTagType: TAG_VISIBLE_TYPES.alcohol_usage,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.cannibis_usage]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.cannibis_usage]?.visible}
                label="Cannabis"
                placeholder="Yes"
                onPressIn={() => {
                  navigation.navigate(screenName.CANNABIS, {
                    currentTagType: TAG_VISIBLE_TYPES.cannibis_usage,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.drug_usage]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.drug_usage]?.visible}
                label="Drugs"
                placeholder="Yes"
                onPressIn={() => {
                  navigation.navigate(screenName.DRUGS, {
                    currentTagType: TAG_VISIBLE_TYPES.drug_usage,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.language]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.language]?.visible}
                label="Languages"
                placeholder="English, Spanish, French, German, Italian"
                onPressIn={() => {
                  navigation.navigate(screenName.LANGUAGES, {
                    currentTagType: TAG_VISIBLE_TYPES.language,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.music_genre]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.music_genre]?.visible}
                label="Music Genres"
                placeholder="Pop, Rock, Hip-Hop, R&B, Country"
                onPressIn={() => {
                  navigation.navigate(screenName.MUSIC_GENRES, {
                    currentTagType: TAG_VISIBLE_TYPES.music_genre,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.book_genre]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.book_genre]?.visible}
                label="Book Genres"
                placeholder="Fiction, Non-Fiction, Romance, Mystery, Thriller"
                onPressIn={() => {
                  navigation.navigate(screenName.BOOK_GENRES, {
                    currentTagType: TAG_VISIBLE_TYPES.book_genre,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.pets]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.pets]?.visible}
                label="Pets"
                placeholder="Dog, Cat, Fish, Bird, Reptile"
                onPressIn={() => {
                  navigation.navigate(screenName.PETS, {
                    currentTagType: TAG_VISIBLE_TYPES.pets,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.physical_activity]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.physical_activity]?.visible}
                label="Sports"
                placeholder="Basketball, Football, Soccer, Tennis, Volleyball"
                onPressIn={() => {
                  navigation.navigate(screenName.PHYSICAL_ACTIVITY, {
                    currentTagType: TAG_VISIBLE_TYPES.physical_activity,
                  });
                }}
                {...inputTextProps}
              />

              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.going_out]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.going_out]?.visible}
                label="Going Out"
                placeholder="Bars, Clubs, Concerts, Movies, Sports"
                onPressIn={() => {
                  navigation.navigate(screenName.GOING_OUT, {
                    currentTagType: TAG_VISIBLE_TYPES.going_out,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.staying_in]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.staying_in]?.visible}
                label="Staying In"
                placeholder="Watching TV, Cooking, Reading, Gaming, Bingeing"
                onPressIn={() => {
                  navigation.navigate(screenName.STAYING_IN, {
                    currentTagType: TAG_VISIBLE_TYPES.staying_in,
                  });
                }}
                {...inputTextProps}
              />
              <AppInput
                _typeOf="tag_field"
                value={userTags[TAG_VISIBLE_TYPES.creative]?.userTags
                  .map((item: any) => item.tagName)
                  .join(", ")}
                visible={userTags[TAG_VISIBLE_TYPES.creative]?.visible}
                label="Creative Outlet"
                placeholder="Writing, Painting, Photography, Music, Film"
                onPressIn={() => {
                  navigation.navigate(screenName.CREATIVE_OUTLET, {
                    currentTagType: TAG_VISIBLE_TYPES.creative,
                  });
                }}
                {...inputTextProps}
              />
            </View>
          </View>
        </ScrollView>

        <View style={{ paddingTop: 20 }}>
          <AppButton colorScheme="coolGray" onPress={openModal}>
            Share Profile Link
          </AppButton>
        </View>
        <ShareModal visible={modalVisible} onClose={closeModal} />
      </GradientLayout>
    </>
  );
};
