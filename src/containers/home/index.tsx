/* eslint-disable import/prefer-default-export */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, Linking, Alert, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons, Octicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@apollo/client";
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
import { useSegment } from "../../analytics";
import { selectUser, selectUserVisuals } from "../../store/features/user/userSlice";
import { GET_SHARE_PROFILE_FEEDBACK } from "../../services/graphql/share-profile/queries";
import { selectFeedbacks, setFeedback } from "../../store/features/feedback/feedbackSlice";

export const Home = () => {
  const { user } = useAppSelector(selectUser);
  const firstName = user?.firstName;
  const email = user?.email;
  const userId = user?.userId;

  const fdback = useAppSelector(selectFeedbacks);

  const dispatch = useAppDispatch();

  const userVisuals = useAppSelector(selectUserVisuals);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const analytics = useSegment();

  useEffect(() => {
    const view = openSettings
      ? { screenName: analyticScreenNames.settings, screenType: screenClass.profile }
      : { screenName: analyticScreenNames.profileHome, screenType: screenClass.profile };
    analytics.screenEvent(view);
  }, [openSettings, analytics]);

  const [deleteUser] = useMutation(DELETE_USER_PROFILE);

  //   methods
  const openUrlTerms = useCallback(async () => {
    analytics.trackEvent({
      eventName: eventNames.redirectTermsButton,
      params: {
        screenClass: screenClass.settings,
      },
    });
    const url = "https://facets.one/terms";
    const supported = await Linking.canOpenURL(url);

    if (supported) await Linking.openURL(url);
  }, []);

  const openUrlPolicy = useCallback(async () => {
    analytics.trackEvent({
      eventName: eventNames.redirectPrivacyButton,
      params: {
        screenClass: screenClass.settings,
      },
    });
    const url = "https://facets.love/privacy/";
    const supported = await Linking.canOpenURL(url);

    if (supported) await Linking.openURL(url);
  }, []);

  const revokeAppleSignInPermission = async () => {
    try {
      dispatch({
        type: "appUser/logout",
      });
    } catch (error) {}
  };

  const createLogoutAlert = () => {
    analytics.trackEvent({
      eventName: eventNames.logoutAccountButton,
      params: {
        screenClass: screenClass.settings,
      },
    });
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => {
          analytics.trackEvent({
            eventName: eventNames.logoutAccountButton,
            params: {
              screenClass: screenClass.settings,
              action: 'cancel',
            },
          });
        },
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => {
          setOpenSettings(false);
          revokeAppleSignInPermission();
          analytics.trackEvent({
            eventName: eventNames.logoutAccountButton,
            params: {
              screenClass: screenClass.settings,
              action: 'log out',
            },
          });
        },
      },
    ]);
  };

  const createDeleteAlert = () => {
    analytics.trackEvent({
      eventName: eventNames.deleteAccountButton,
      params: {
        screenClass: screenClass.settings,
      },
    });
    Alert.alert("Delete", "Are you sure you want to delete your scoop account?", [
      {
        text: "Cancel",
        onPress: () => {
          analytics.trackEvent({
            eventName: eventNames.deleteAccountButton,
            params: {
              screenClass: screenClass.settings,
              action: 'cancel',
            },
          });
        },
        style: "cancel",
      },
      {
        text: "OK",
        style: "destructive",
        onPress: () => {
          analytics.trackEvent({
            eventName: eventNames.deleteAccountButton,
            params: {
              screenClass: screenClass.settings,
              action: 'confirm delete',
            },
          });
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

  const { data: ShareProfileFeedbackData, loading: ShareProfileFeedbackLoading } = useQuery(
    GET_SHARE_PROFILE_FEEDBACK,
    {
      variables: {
        userId,
      },
    }
  );

  useEffect(() => {
    if (ShareProfileFeedbackData) {
      const feedback = ShareProfileFeedbackData.getShareProfileFeedback;
      if (feedback) {
        dispatch(setFeedback({ feedback }));
      }
    }
  }, [ShareProfileFeedbackData, ShareProfileFeedbackLoading, dispatch]);

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
            displayPhoto={userVisuals && userVisuals[0] ? userVisuals[0]?.videoOrPhoto : null}
          />
        </Pressable>
        {fdback && fdback.length > 0 && (
          <TouchableOpacity onPress={() => navigation.navigate(screenName.USER_PROFILE_FEEDBACK)}>
            <View style={styles.noticeBody}>
              <Text style={styles.noticeText}>You have got profile feedback!!!</Text>
              <Ionicons name="ios-chevron-forward" size={24} color="black" />
            </View>
          </TouchableOpacity>
        )}
        {openSettings ? (
          <SlideUpModal close={() => setOpenSettings(false)} state={openSettings}>
            <View style={{ flex: 1 }}>
              <Text style={styles.modalHeading}>Profile Settings</Text>
              <View style={styles.modalContainerHeader}>
                <ProfileAvatar
                  settings={openSettings}
                  displayPhoto={userVisuals && userVisuals[0] ? userVisuals[0]?.videoOrPhoto : null}
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
