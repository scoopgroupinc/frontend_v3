/* eslint-disable import/prefer-default-export */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, Linking, Alert } from "react-native";
import { FontAwesome5, Ionicons, Octicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollableGradientLayout } from "../../components/layouts/ScrollableGradientLayout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SlideUpModal } from "../../components/layouts/SlideUpModal";
import { ProfileAvatar } from "../../components/molecule/ProfileAvatar";
import { screenName } from "../../utils/constants";
import { DELETE_USER_PROFILE } from "../../services/graphql/user/mutations";
import { setCriterias } from "../../store/features/matches/matchSlice";
import { styles } from "./styles";
import OptionTab from "../../components/atoms/OptionsTabs";
import { analyticScreenNames, eventNames, screenClass } from "../../analytics/constants";
import { logEvent, onScreenView } from "../../analytics";
import { selectUser, selectUserVisuals } from "../../store/features/user/userSlice";

export const Home = () => {
  const { user } = useAppSelector(selectUser);
  const firstName = user?.firstName;
  const email = user?.email;
  const userId = user?.userId;

  const dispatch = useAppDispatch();

  const userVisuals = useAppSelector(selectUserVisuals);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [openSettings, setOpenSettings] = useState<boolean>(false);

  useEffect(() => {
    const view = openSettings
      ? { screenName: analyticScreenNames.settings, screenType: screenClass.profile }
      : { screenName: analyticScreenNames.profileHome, screenType: screenClass.profile };
    onScreenView(view);
  }, [openSettings]);

  const [deleteUser] = useMutation(DELETE_USER_PROFILE);

  //   methods
  const openUrlTerms = useCallback(async () => {
    //    logEvent({
    //      eventName: eventNames.redirectTermsButton,
    //      params: {
    //        screenClass: screenClass.settings,
    //      },
    //    });
    const url = "https://scoop.love/terms";
    const supported = await Linking.canOpenURL(url);

    if (supported) await Linking.openURL(url);
  }, []);

  const openUrlPolicy = useCallback(async () => {
    //  logEvent({
    //    eventName: eventNames.redirectPrivacyButton,
    //    params: {
    //      screenClass: screenClass.settings,
    //    },
    //  });
    const url = "https://scoop.love/privacy-policy/";
    const supported = await Linking.canOpenURL(url);

    if (supported) await Linking.openURL(url);
  }, []);

  const createLogoutAlert = () => {
    //   logEvent({
    //     eventName: eventNames.logoutAccountButton,
    //     params: {
    //       screenClass: screenClass.settings,
    //     },
    //   });
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => {
          setOpenSettings(false);
          dispatch({
            type: "appUser/logout",
          });
        },
      },
    ]);
  };

  const createDeleteAlert = () => {
    logEvent({
      eventName: eventNames.deleteAccountButton,
      params: {
        screenClass: screenClass.settings,
      },
    });
    Alert.alert("Delete", "Are you sure you want to delete your scoop account?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => {
          deleteUser({ variables: { email, userId } }).then(() => {
            setOpenSettings(false);
            dispatch({
              type: "appUser/deleteAccount",
            });
          });
        },
      },
    ]);
  };
  const criteriaData = useMemo(
    () => [
      {
        id: "1",
        title: "Trustworty",
        description: "Principled, Reliable",
        type: "user_visuals",
      },
      {
        id: "2",
        title: "Smart",
        description: "Insightful, Perceptive",
        type: "user_visuals",
      },
      {
        id: "3",
        title: "Attractive",
        description: "Pretty/Handsome",
        type: "user_visuals",
      },
      {
        id: "4",
        title: "Well Written",
        description: "Understandable, Concise, Grammatically correct",
        type: "user_prompts",
      },
      {
        id: "5",
        title: "Informative",
        description: "Authentic, Glimpse of person",
        type: "user_prompts",
      },
      {
        id: "6",
        title: "Engaging",
        description: "Positive, Interesting, Funny",
        type: "user_prompts",
      },
    ],

    []
  );

  useEffect(() => {
    dispatch(
      setCriterias({
        criterias: criteriaData,
      })
    );
  }, [dispatch, criteriaData]);

  return (
    <ScrollableGradientLayout>
      <>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{firstName ? `${firstName}'s Profile` : "Profile"}</Text>
          <FontAwesome5
            style={styles.setting}
            onPress={() => setOpenSettings(true)}
            name="cog"
            size={20}
            color="white"
          />
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate(screenName.USER_PROFILE);
          }}
        >
          <ProfileAvatar
            displayPhoto={
              userVisuals &&  userVisuals[0]? userVisuals[0]?.videoOrPhoto : null
            }
          />
          <TouchableOpacity>
            <View style={styles.noticeBody}>
              <Text style={styles.noticeText}>You have got profile feedback!!!</Text>
              <FontAwesome5 name="arrow-right" size={16} color="black" />
            </View>
          </TouchableOpacity>
        </Pressable>
        {openSettings ? (
          <SlideUpModal close={() => setOpenSettings(false)} state={openSettings}>
            <View style={{ flex: 1 }}>
              <Text style={styles.modalHeading}>Profile Settings</Text>
              <View style={styles.modalContainerHeader}>
                <ProfileAvatar
                  settings={openSettings}
                  displayPhoto={
                    userVisuals &&  userVisuals[0]? userVisuals[0]?.videoOrPhoto : null
                  }
                />
              </View>

              <OptionTab
                optionName="Terms & Conditions"
                btnAction={openUrlTerms}
                icon={<Octicons name="code-of-conduct" size={24} color="black" />}
              />
              <OptionTab
                optionName="Product Policies"
                btnAction={openUrlPolicy}
                icon={<Ionicons name="md-shield-checkmark-outline" size={24} color="black" />}
              />
              <OptionTab
                optionName="Logout"
                btnAction={createLogoutAlert}
                icon={<Ionicons name="exit-outline" size={24} color="black" />}
              />
              <OptionTab
                optionName="Delete Account"
                btnAction={createDeleteAlert}
                icon={<Ionicons name="trash" size={24} color="black" />}
              />
            </View>
          </SlideUpModal>
        ) : (
          ""
        )}
      </>
    </ScrollableGradientLayout>
  );
};
