import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable, Linking, Alert } from "react-native";
import { ScrollableGradientLayout } from "../../components/layouts/ScrollableGradientLayout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { SlideUpModal } from "../../components/layouts/SlideUpModal";
import { ProfileAvatar } from "../../components/molecule/ProfileAvatar";
import { screenName } from "../../utils/constants";
import OptionTab from "../../components/atoms/OptionsTabs";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_USER_PROFILE } from "../../services/graphql/user/mutations";
import {
  GET_PROMPTS_ORDER,
  GET_USER_TAGS_TYPE_VISIBLE,
} from "../../services/graphql/profile/queries";
import {
  selectUser,
  setUserProfile,
  setUserPrompts,
} from "../../store/features/user/userSlice";
import { styles } from "./styles";

export const Home = () => {
  const { user } = useAppSelector(selectUser);
  const firstName = user?.firstName;
  const email = user?.email;
  const userId = user?.userId;

  const dispatch = useAppDispatch();

  const { userVisuals } = useAppSelector((state) => state.appUser);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const {
    data: userPromptData,
    loading: userPromptLoading,
    refetch: userPromptRefetch,
    networkStatus: userPromptNetworkStatus,
  } = useQuery(GET_PROMPTS_ORDER, {
    variables: {
      userPromptsOrder: {
        userId,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: userProfileLoading,
    data: userProfileResult,
    refetch: userProfileRefetch,
  } = useQuery(GET_USER_TAGS_TYPE_VISIBLE, {
    variables: { userId },
    notifyOnNetworkStatusChange: true,
  });

  const [
    deleteUser,
    {
      data: userDeleteResult,
      loading: userDeleteLoading,
      error: userDeleteError,
    },
  ] = useMutation(DELETE_USER_PROFILE);

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
    // logEvent({
    //   eventName: eventNames.deldeleteAccountButton,
    //   params: {
    //     screenClass: screenClass.settings,
    //   },
    // });
    Alert.alert(
      "Delete",
      "Are you sure you want to delete your scoop account?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          style: "destructive",
          onPress: () => {
            deleteUser({ variables: { email, userId } }).then((res) => {
              setOpenSettings(false);
              dispatch({
                type: "appUser/deleteAccount",
              });
            });
            navigation.replace(screenName.LAUNCH);
          },
        },
      ]
    );
  };

  const componentDidMount = () => {
    userProfileRefetch();
    userPromptRefetch();
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  useEffect(() => {
    if (userPromptData && !userPromptLoading) {
      dispatch(
        setUserPrompts({
          userPrompts: userPromptData?.getUserPromptsOrder,
        })
      );
    }
  }, [userPromptData, userPromptLoading]);

  useEffect(() => {
    if (userProfileResult && !userProfileLoading) {
      const { getAllUserTagsTypeVisible } = userProfileResult;
      const modifiedResult: any = getAllUserTagsTypeVisible.map((item: any) => {
        return {
          userId: item.userId,
          tagType: item.tagType,
          userTags:
            item.userTags.length === 0
              ? item.userTags
              : item.userTags?.map((tag: any) => {
                  return {
                    userId: item.userId,
                    tagName: tag.tagName,
                    tagType: tag.tagType,
                  };
                }),
          visible: item.visible,
          emoji: item.emoji,
        };
      });
      dispatch(
        setUserProfile({
          userProfile: modifiedResult,
        })
      );
    }
  }, [userProfileResult, userProfileLoading]);

  return (
    <ScrollableGradientLayout>
      <>
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            {firstName ? `${firstName}'s Profile` : "Profile"}
          </Text>
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
              userVisuals && userVisuals.length > 0
                ? userVisuals[0]?.videoOrPhoto
                : null
            }
          />
        </Pressable>
        {openSettings ? (
          <SlideUpModal
            close={() => setOpenSettings(false)}
            state={openSettings}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.modalHeading}>Profile Settings</Text>
              <View style={styles.modalContainerHeader}>
                <ProfileAvatar
                  settings={openSettings}
                  displayPhoto={
                    userVisuals && userVisuals.length > 0
                      ? userVisuals[0]?.videoOrPhoto
                      : null
                  }
                />
              </View>

              <OptionTab
                optionName="Terms & Conditions"
                btnAction={openUrlTerms}
                icon={
                  <Octicons name="code-of-conduct" size={24} color="black" />
                }
              />
              <OptionTab
                optionName="Product Policies"
                btnAction={openUrlPolicy}
                icon={<MaterialIcons name="policy" size={24} color="black" />}
              />
              <OptionTab
                optionName="Logout"
                btnAction={createLogoutAlert}
                icon={<AntDesign name="logout" size={24} color="black" />}
              />
              <OptionTab
                optionName="Delete Account"
                btnAction={createDeleteAlert}
                icon={
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="black"
                  />
                }
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
