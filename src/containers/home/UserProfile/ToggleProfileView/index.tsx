/* eslint-disable import/prefer-default-export */
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
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
} from "../../../../store/features/user/userSlice";
import { logEvent } from "../../../../analytics";
import { eventNames } from "../../../../analytics/constants";

import AppActivityIndicator from "../../../../components/atoms/ActivityIndicator";
import { screenName } from "../../../../utils/constants";
import { useNavState } from "./hooks/useNavState";
import { useSaveUserProfile } from "./hooks/useSaveUserProfile";
import { useSaveUserPrompts } from "./hooks/useSaveUserPrompts";
import { useSaveUserVisuals } from "./hooks/useSaveUserVisuals";

export const ToggleProfileView = () => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];
  const insets = useSafeAreaInsets();

  const Stack = createNativeStackNavigator();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [navState] = useNavState();

  const [modalState, setModalState] = useState<boolean>(false);
  const [saving, isSaving] = useState<boolean>(false);
  const [doneState, setDoneState] = useState<boolean>(false);

  const isDirty = useAppSelector(selectIsDirty);

  const dispatch = useAppDispatch();

  // make copy to allow for undoing of changes
  useEffect(() => {
    dispatch(copyUserData());
  }, [dispatch]);

  const [saveUserVisuals] = useSaveUserVisuals();
  const [saveUserProfile] = useSaveUserProfile();
  const [saveUserPrompts] = useSaveUserPrompts();

  const saveChanges = useCallback(async () => {
    isSaving(true);
    logEvent({
      eventName: eventNames.editMainProfileButton,
      params: {},
    });
    try {
      const saveCalls = [saveUserProfile, saveUserPrompts, saveUserVisuals].filter(
        (item) => item !== null
      );

      await Promise.all(saveCalls.map((func) => func()));

      dispatch(clearCopyData());
      isSaving(false);
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
    } catch (error) {
      Alert.alert(error.message);
      isSaving(false);
    }
  }, [dispatch, navigation, saveUserPrompts, saveUserProfile, saveUserVisuals]);

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
