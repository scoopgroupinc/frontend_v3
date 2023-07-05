/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { useMutation } from "@apollo/client";
import { Colors } from "../../../../utils";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { UserProfileView } from "../../UserProfileView";
import { UserProfileEdit } from "../../UserProfileEdit";
import { FloatingNav } from "../../../../components/molecule/FloatingNav";
import { AppButton } from "../../../../components/atoms/AppButton";
import { AppAlert } from "../../../../components/layouts/AppAlert";
import {
  clearCopyData,
  copyUserData,
  resetToCopyData,
  selectIsDirty,
  selectUser,
  selectUserProfile,
  selectUserPrompts,
  selectUserVisuals,
  setUserVisuals,
} from "../../../../store/features/user/userSlice";
import {
  SAVE_USER_PROMPTS,
  SAVE_USER_PROMPT_ORDER,
  SAVE_USER_TAGS_TYPE_VISIBLE,
} from "../../../../services/graphql/profile/mutations";
import { logEvent } from "../../../../analytics";
import { eventNames } from "../../../../analytics/constants";
import { URLS } from "../../../../utils/constants/apis";
import AppActivityIndicator from "../../../../components/atoms/ActivityIndicator";
import { screenName } from "../../../../utils/constants";

export const ToggleProfileView = () => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];
  const insets = useSafeAreaInsets();
  const [isPreview, setIsPreview] = useState(false);
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const items = [
    {
      id: 1,
      name: "Edit",
      icon: "pencil",
      onPress: () => {
        navigation.navigate(screenName.USER_PROFILE_EDIT);
        setIsPreview(false);
      },
      isSelected: !isPreview,
    },
    {
      id: 2,
      name: "View",
      icon: "eye-outline",
      onPress: () => {
        navigation.navigate(screenName.USER_PROFILE_VIEW);
        setIsPreview(true);
      },
      isSelected: isPreview,
    },
  ];
  const [navState, setNavState] = useState(items);

  useEffect(() => {
    setNavState([...items]);
  }, [isPreview]);

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
        navigation.goBack();
      })
      .catch((err) => {
        isSaving(false);
      });
  };

  const [saveUserPromptsOrder] = useMutation(SAVE_USER_PROMPT_ORDER);

  const [saveUserPrompts] = useMutation(SAVE_USER_PROMPTS, {
    variables: {
      UserPromptInput: userPrompts
        .filter((item: any) => item.answer !== "")
        .map((item: any) => ({
          answer: item.answer,
          promptId: item.promptId,
          userId,
        })),
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
                Alert.alert(err.message);
                isSaving(false);
                // navigation.goBack()
              });
          },
          onError: (e: any) => {
            Alert.alert(e.message);
            isSaving(false);
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
      }
    },
    onError: (error) => {
      Alert.alert(error.message);
      isSaving(false);
    },
  });

  const [saveUserProfile] = useMutation(SAVE_USER_TAGS_TYPE_VISIBLE, {
    variables: {
      userTagsTypeVisibleInput: userProfile,
    },
    onCompleted: async (data) => {
      saveUserPrompts();
      dispatch(clearCopyData());
      isSaving(false);
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert(error.message);
      isSaving(false);
    },
  });

  const saveChanges = async () => {
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

  const handleCancelButton = () => {
    if (isDirty) {
      setModalState(true);
    } else {
      cancelChanges();
    }
  };

  return (
    <>
      <AppActivityIndicator visible={saving} />
      <LinearGradient style={{ flex: 1, position: "relative" }} colors={gradient}>
        <View style={{ flex: 1, marginTop: insets.top ? insets.top + 20 : 20 }}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name={screenName.USER_PROFILE_EDIT} component={UserProfileEdit} />
            <Stack.Screen name={screenName.USER_PROFILE_VIEW} component={UserProfileView} />
          </Stack.Navigator>
        </View>
        <View
          style={{
            position: "absolute",
            top: insets.top ? insets.top : 10,
            left: "3%",
            right: "3%",
            alignItems: "center",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppButton style={styles.topButton} onPress={() => handleCancelButton()}>
            Cancel
          </AppButton>
          <View style={styles.topContainer}>
            <FloatingNav items={navState} />
          </View>
          <AppButton isDisabled={!isDirty} style={styles.topButton} onPress={() => saveChanges()}>
            {saving ? "Saving..." : "Done"}
          </AppButton>
        </View>

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
      </LinearGradient>
    </>
  );
};
