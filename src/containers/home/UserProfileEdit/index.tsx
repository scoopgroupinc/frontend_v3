/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { useMutation } from "@apollo/client";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { ScrollableGradientLayout } from "../../../components/layouts/ScrollableGradientLayout";
import { AppAlert } from "../../../components/layouts/AppAlert";
import { AppButton } from "../../../components/atoms/AppButton";
import {
  SAVE_USER_PROMPTS,
  SAVE_USER_PROMPT_ORDER,
  SAVE_USER_TAGS_TYPE_VISIBLE,
} from "../../../services/graphql/profile/mutations";
import { Colors } from "../../../utils";
import { MediaContainer } from "../../../components/molecule/MediaContainer";
import {
  selectUser,
  selectUserProfile,
  selectUserPrompts,
  selectUserVisuals,
  setUserVisuals,
  setEditPrompt,
  setEditPromptIndex,
  copyUserData,
  clearCopyData,
  resetToCopyData,
  selectIsDirty,
} from "../../../store/features/user/userSlice";
import { CaptureText } from "../../../features/Prompt/components/CaptureText";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { screenName } from "../../../utils/constants";
import { styles } from "./styles";
import { AppInput } from "../../../components/atoms/AppInput";
import { URLS } from "../../../utils/constants/apis";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { logEvent, onScreenView } from "../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";

const inputTextProps = {
  editable: false,
};

export const UserProfileEdit = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [modalState, setModalState] = useState<boolean>(false);
  const [saving, isSaving] = useState<boolean>(false);
  const [doneState, setDoneState] = useState<boolean>(false);

  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;
  const userPrompts = useAppSelector(selectUserPrompts);
  const userVisuals = useAppSelector(selectUserVisuals);
  const userProfile = useAppSelector(selectUserProfile);
  const isDirty = useAppSelector(selectIsDirty);

  const dispatch = useAppDispatch();

  // make copy to allow for undoing of changes
  useEffect(() => {
    dispatch(copyUserData());
  }, [dispatch]);

  const handleUserVisuals = (image: any) => {
    const newImages = [...userVisuals];
    newImages[image.index] = {
      videoOrPhoto: image.imageUri,
    };
    dispatch(
      setUserVisuals({
        userVisuals: newImages,
      })
    );
  };

  const UserPromptInput = userPrompts
    ?.filter((item: any) => item.answer !== "")
    ?.map((item: any) => ({
      answer: item.answer,
      promptId: item.promptId,
      userId,
    }));

  const handleSaveImages = async (img: any) => {
    const postUrl = URLS.FILE_URL;
    if (img.includes("file://")) {
      await FileSystem.uploadAsync(`${postUrl}/api/v1/visuals/uploadvisuals/${userId}`, img, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "files",
      })
        .then((res) => {
          isSaving(false);
        })
        .catch((err) => {});
    }
  };

  const saveVisuals = async () => {
    const imageArray = [...userVisuals];
    await Promise.all(imageArray.map(async (image: any) => handleSaveImages(image.videoOrPhoto)))
      .then(() => {
        isSaving(false);
        // Toast.show("User profile has been saved successfully!", {
        //   duration: Toast.durations.LONG,
        //   position: Toast.positions.BOTTOM,
        //   shadow: true,
        //   animation: true,
        //   hideOnPress: true,
        //   delay: 0,
        // });
        navigation.goBack();
      })
      .catch((err) => {
        isSaving(false);
        // Toast.show("Error saving Photos", {
        //   duration: Toast.durations.LONG,
        //   position: Toast.positions.BOTTOM,
        //   shadow: true,
        //   animation: true,
        //   hideOnPress: true,
        //   delay: 0,
        // });
      });
  };

  const [saveUserPromptsOrder] = useMutation(SAVE_USER_PROMPT_ORDER);

  const [saveUserPrompts] = useMutation(SAVE_USER_PROMPTS, {
    variables: {
      UserPromptInput,
    },
    onCompleted: async (data) => {
      const { saveUserPrompts: prompts } = data;
      if (prompts.length > 0) {
        // get the ids of prompts in items
        const ids: string[] = userPrompts.map((item: any) => item.id);

        prompts.forEach((item: any, index: number) => {
          if (item.id !== ids[index]) {
            ids[index] = item.id;
          }
        });

        saveUserPromptsOrder({
          variables: {
            UserPromptsOrder: {
              userId,
              userPromptIds: ids,
            },
          },
          onCompleted: async (e) => {
            await saveVisuals()
              .then(() => {
                Alert.alert(
                  "Profile Saved",
                  "Your profile has been saved successfully!",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        navigation.goBack();
                      },
                    },
                  ],
                  { cancelable: false }
                );
              })
              .catch((err) => {
                isSaving(false);
                //  Toast.show("Error saving photos", {
                //    duration: Toast.durations.LONG,
                //    position: Toast.positions.BOTTOM,
                //    shadow: true,
                //    animation: true,
                //    hideOnPress: true,
                //    delay: 0,
                //  });
                // navigation.goBack()
              });
          },
          onError: (e: any) => {
            isSaving(false);
            //  Toast.show("Error saving prompts order", {
            //    duration: Toast.durations.LONG,
            //    position: Toast.positions.BOTTOM,
            //    shadow: true,
            //    animation: true,
            //    hideOnPress: true,
            //    delay: 0,
            //  });
          },
        });
      } else {
        await saveVisuals()
          .then(() => {
            Alert.alert(
              "Profile Saved",
              "Your profile has been saved successfully!",
              [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ],
              { cancelable: false }
            );
          })
          .catch((err) => {
            //  Toast.show("Error saving photos", {
            //    duration: Toast.durations.LONG,
            //    position: Toast.positions.BOTTOM,
            //    shadow: true,
            //    animation: true,
            //    hideOnPress: true,
            //    delay: 0,
            //  });
            // navigation.goBack()
          });
      }
    },
    onError: (error) => {
      isSaving(false);
      //  Toast.show("Error saving prompts", {
      //    duration: Toast.durations.LONG,
      //    position: Toast.positions.BOTTOM,
      //    shadow: true,
      //    animation: true,
      //    hideOnPress: true,
      //    delay: 0,
      //  });
    },
  });

  const [saveUserProfile] = useMutation(SAVE_USER_TAGS_TYPE_VISIBLE, {
    variables: {
      userTagsTypeVisibleInput: userProfile,
    },
    onCompleted: async (data) => {
      saveUserPrompts();
    },
    onError: (error) => {
      isSaving(false);
    },
  });

  const saveChanges = async () => {
    dispatch(clearCopyData());
    isSaving(true);
    saveUserProfile();
    logEvent({
      eventName: eventNames.editMainProfileButton,
      params: {},
    });
  };

  const cancelChanges = () => {
    dispatch(resetToCopyData());
    logEvent({
      eventName: eventNames.cancelProfileButton,
      params: {},
    });
    setModalState(false);
    navigation.goBack();
  };

  return (
    <>
      <AppActivityIndicator visible={saving} />
      <ScrollableGradientLayout safe={false}>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <AppAlert state={modalState} close={() => setModalState(false)}>
            <View style={styles.textContainer}>
              <Text style={styles.modalText}>Are you sure you want to discard your changes? </Text>
              <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                  <AppButton style={styles.editButton} onPress={() => setModalState(false)}>
                    Cancel
                  </AppButton>
                </View>
                <View style={styles.buttons}>
                  <AppButton style={styles.confirmButton} onPress={() => cancelChanges()}>
                    Confirm
                  </AppButton>
                </View>
              </View>
            </View>
          </AppAlert>

          <AppAlert state={doneState} close={() => setDoneState(false)}>
            <View style={styles.textContainer}>
              <Text style={styles.modalText}>Are you sure you want to save your changes?</Text>
              <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                  <AppButton style={styles.editButton} onPress={() => setDoneState(false)}>
                    Cancel
                  </AppButton>
                </View>
                <View style={styles.buttons}>
                  <AppButton
                    style={styles.confirmButton}
                    bgColor={Colors.WHITE}
                    onPress={() => saveChanges()}
                  >
                    Confirm
                  </AppButton>
                </View>
              </View>
            </View>
          </AppAlert>

          <View style={styles.topContainer}>
            <AppButton style={styles.topButton} onPress={() => setModalState(true)}>
              Cancel
            </AppButton>
            <AppButton style={styles.topButton} isDisabled={!isDirty} onPress={() => saveChanges()}>
              {saving ? "Saving..." : "Done"}
            </AppButton>
          </View>

          {/* media box  */}

          <View style={styles.mediaBox}>
            <Text style={styles.mediaHeader}>Photos</Text>
            <MediaContainer images={userVisuals} onAddImage={handleUserVisuals} />
          </View>

          <View style={styles.mediaBox}>
            <Text style={styles.mediaHeader}>Prompts</Text>
            {userPrompts?.map((item: any, index: any) => (
              <CaptureText
                key={item.id}
                onAdd={() => {
                  dispatch(setEditPromptIndex({ editPromptIndex: index }));
                  navigation.navigate(screenName.ALLPROMPTS);
                }}
                onEdit={() => {
                  dispatch(setEditPromptIndex({ editPromptIndex: index }));
                  dispatch(setEditPrompt({ editPrompt: item }));
                  navigation.navigate(screenName.PROMPT_ANSWER, { prompt: item });
                }}
                prompt={item}
                onSwap={() => {
                  dispatch(setEditPromptIndex({ editPromptIndex: index }));
                  navigation.navigate(screenName.ALLPROMPTS);
                }}
              />
            ))}
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
    </>
  );
};
