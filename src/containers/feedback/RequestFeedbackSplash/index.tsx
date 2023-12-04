import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { screenName } from "../../../utils/constants";
import { useAppSelector } from "../../../store/hooks";
import { selectFeedbackUser } from "../../../store/features/feedback/feedbackSlice";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { useSegment } from "../../../analytics";

const RequestFeedbackSplash = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const user = useAppSelector(selectFeedbackUser) || {
    visuals: [],
  };
  const { visuals } = user;

  const analytics = useSegment();
  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.profileFeedbackLanding,
      screenType: screenClass.feedback,
      feedbackUser: user,
    });
  }, []);

  return (
    <GradientLayout>
      <View style={styles.body}>
        <Image
          source={require("../../../assets/images/facets-logo.png")}
          style={{ height: 80, width: 80 }}
        />
        <Image
          source={{
            uri: visuals && visuals[0] ? visuals[0]?.videoOrPhoto : null,
          }}
          style={{ height: 160, width: 160, borderRadius: 100 }}
        />
        <View style={styles.requestBody}>
          <Text style={styles.title}>I want your opinion</Text>
          <Image
            source={require("../../../assets/images/back-tears.png")}
            style={{ height: 80, width: 80, borderRadius: 100 }}
          />
          <Text style={styles.title}>Please help me grow while dating!</Text>
        </View>
      </View>
      <View style={styles.buttonsBody}>
        <AppButton
          style={styles.btn}
          onPress={() => navigation.navigate(screenName.REQUEST_FEEDBACK_PROFILE)}
        >
          Accept Request
        </AppButton>
        <AppButton
          style={styles.btn}
          onPress={() => navigation.navigate(screenName.PROFILE_NAVIGATOR)}
        >
          Decline Request
        </AppButton>
      </View>
    </GradientLayout>
  );
};

export default RequestFeedbackSplash;
