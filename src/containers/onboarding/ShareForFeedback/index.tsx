/* eslint-disable global-require */
import { Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUser, updateUser } from "../../../store/features/user/userSlice";
import { useShare } from "../../../hooks/useShare";
import { GET_USER_SHARE_PROFILE_LINK } from "../../../services/graphql/user-link/mutations";
import { encryptData } from "../../../utils/helpers";
import { screenName } from "../../../utils/constants";

const ShareForFeedback = () => {
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;
  const dispatch = useAppDispatch();
  const { share } = useShare();

  const [link, setLink] = React.useState<string>("");

  const [getShareLink] = useMutation(GET_USER_SHARE_PROFILE_LINK);
  useEffect(() => {
    getShareLink({
      variables: {
        userId,
      },
    }).then((res) => {
      const cipherLink = encryptData(res?.data.getUserShareProfileLink);
      setLink(cipherLink);
    });
  }, [getShareLink, userId]);

  const gotoProfileEditView = (value: string) => {
    dispatch(
      updateUser({
        value: {
          location: { name: screenName.TOGGLE_PROFILE_VIEW, value },
        },
      })
    );
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
          onPress={() => {
            share(link);
          }}
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
