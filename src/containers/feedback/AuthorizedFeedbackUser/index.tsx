import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { Typography } from "../../../utils";
import { useShare } from "../../../hooks/useShare";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userSlice";
import { GET_USER_SHARE_PROFILE_LINK } from "../../../services/graphql/user-link/mutations";
import { screenName } from "../../../utils/constants";
import { encryptData } from "../../../utils/helpers";

const AuthorizedFeedbackUser = () => {
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;
  const { share } = useShare();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
    navigation.navigate(screenName.PROFILE_NAVIGATOR, {
      screen: screenName.USER_PROFILE,
      params: { screen: screenName.TOGGLE_PROFILE_VIEW, params: { value } },
    });
  };

  return (
    <GradientLayout>
      <View style={styles.body}>
        <Text style={[styles.title, { fontFamily: Typography.FONT_POPPINS_REGULAR }]}>
          THANK YOU
        </Text>
        <Text style={[styles.title, { fontSize: 20, marginTop: 40 }]}>
          You just got some good karma!
        </Text>
        <Text style={styles.title}>Get feedback too!</Text>
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

export default AuthorizedFeedbackUser;
