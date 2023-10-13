/* eslint-disable global-require */
import { Image, Text, View } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { useAppDispatch } from "../../../store/hooks";
import { updateUser } from "../../../store/features/user/userSlice";
import { screenName } from "../../../utils/constants";
import { useGetShareLink } from "../../../hooks/useGetShareLink";

const ShareForFeedback = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const[ shareLinkToSocialMedia ] = useGetShareLink();

  const gotoProfileEditView = (value: string) => {
    dispatch(
      updateUser({
        value: {
          isOnboarded: true,
        },
      })
    );
    navigation.navigate(screenName.USER_PROFILE, {
      screen: screenName.TOGGLE_PROFILE_VIEW,
      params: { value },
    });
  };

  return (
    <GradientLayout>
      <View style={styles.headingBody}>
        <Image
          source={require("../../../assets/images/scoop-logo.png")}
          style={{ height: 250, width: 250 }}
        />
        <View style={styles.textBody}>
          <Text style={styles.title}>Share your profile and get feedback</Text>
        </View>
      </View>
      <View style={styles.buttonsBody}>
        <AppButton
          style={styles.btn}
          onPress={shareLinkToSocialMedia}
        >
          Get Share Link
        </AppButton>
        <AppButton style={styles.btn} onPress={() => gotoProfileEditView("View")}>
          Preview Profile
        </AppButton>
        <AppButton style={styles.btn} onPress={() => gotoProfileEditView("Edit")}>
          Continue Editing Profile
        </AppButton>
      </View>
    </GradientLayout>
  );
};
export default ShareForFeedback;
