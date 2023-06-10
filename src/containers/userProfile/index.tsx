/* eslint-disable import/prefer-default-export */
import React, { useCallback, useState } from "react";
import { View, Text, Pressable, Linking, Alert } from "react-native";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { ScrollableGradientLayout } from "../../components/layouts/ScrollableGradientLayout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { styles } from "./styles";
import { SlideUpModal } from "../../components/layouts/SlideUpModal";
import { ProfileAvatar } from "../../components/molecule/ProfileAvatar";
import { screenName } from "../../utils/constants";
import OptionTab from "../../components/atoms/OptionsTabs";
import { DELETE_USER_PROFILE } from "../../services/graphql/user/mutations";
import { logEvent } from "../../analytics";
import { eventNames, screenClass } from "../../analytics/constants";

export const UserProfile = () => {
  const { user } = useAppSelector((state) => state.appUser);
  const firstName = user?.firstName;
  const email = user?.email;
  const userId = user?.userId;

  const dispatch = useAppDispatch();

  const { userVisuals } = useAppSelector((state) => state.appUser);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const [deleteUser] = useMutation(DELETE_USER_PROFILE);

  //   methods
  const openUrlTerms = useCallback(async () => {
    logEvent({
      eventName: eventNames.redirectTermsButton,
      params: {
        screenClass: screenClass.settings,
      },
    });
    const url = "https://scoop.love/terms";
    const supported = await Linking.canOpenURL(url);

    if (supported) await Linking.openURL(url);
  }, []);

  const openUrlPolicy = useCallback(async () => {
    logEvent({
      eventName: eventNames.redirectPrivacyButton,
      params: {
        screenClass: screenClass.settings,
      },
    });
    const url = "https://scoop.love/privacy-policy/";
    const supported = await Linking.canOpenURL(url);

    if (supported) await Linking.openURL(url);
  }, []);

  const createLogoutAlert = () => {
    logEvent({
      eventName: eventNames.logoutAccountButton,
      params: {
        screenClass: screenClass.settings,
      },
    });
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
          navigation.replace(screenName.LAUNCH);
        },
      },
    ]);
  };

  return (
    <ScrollableGradientLayout>
      <View>
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
        <Pressable onPress={() => navigation.navigate(screenName.USER_PROFILE)}>
          <ProfileAvatar
            displayPhoto={
              userVisuals && userVisuals.length > 0 ? userVisuals[0]?.videoOrPhoto : null
            }
          />
        </Pressable>

        {openSettings ? (
          <SlideUpModal close={() => setOpenSettings(false)} state={openSettings}>
            <View style={{ flex: 1 }}>
              <Text style={styles.modalHeading}>Profile Settings</Text>
              <View style={styles.modalContainerHeader}>
                <ProfileAvatar
                  settings={openSettings}
                  displayPhoto={
                    userVisuals && userVisuals.length > 0 ? userVisuals[0]?.videoOrPhoto : null
                  }
                />
              </View>
              {/* <OptionTab
                  optionName='Edit Account information'
                  icon={<MaterialCommunityIcons name='account' size={24} color='black' />}
                />
                <OptionTab
                  optionName='Preferences'
                  icon={<MaterialCommunityIcons name='account' size={24} color='black' />}
                />
                <OptionTab
                  optionName='Application Settings'
                  icon={<FontAwesome5 name='cogs' size={24} color='black' />}
                />
                <OptionTab
                  optionName='Change Password'
                  icon={<FontAwesome5 name='user-lock' size={24} color='black' />}
                /> */}
              <OptionTab
                optionName="Terms & Conditions"
                btnAction={openUrlTerms}
                icon={<Octicons name="code-of-conduct" size={24} color="black" />}
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
                icon={<MaterialCommunityIcons name="delete" size={24} color="black" />}
              />
            </View>
          </SlideUpModal>
        ) : (
          ""
        )}
      </View>
    </ScrollableGradientLayout>
  );
};
