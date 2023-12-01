import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import { RELIGIOUS_PRACTICES } from "../../../../utils/types/TAGS";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";
import { useSegment } from "../../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../../analytics/constants";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const ReligiousPractices = ({ navigation, route }: any) => {
  const gradient = Colors.GRADIENT_BG;

  const { currentTagType } = route?.params || {};

  const pageTitle = "Religious Practices";

  const practises = RELIGIOUS_PRACTICES;

  const analytics = useSegment();
  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.religiousPractice,
      screenType: screenClass.profile,
    });
  }, []);

  const goBackHome = () => {
    analytics.trackEvent({
      eventName: eventNames.backEditProfileButton,
      params: { screenClass: screenClass.profile },
    });
    navigation.goBack();
  };

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <View style={{ marginHorizontal: "3%" }}>
          <TagScreenHeader close={goBackHome} title={pageTitle} />
        </View>
        <TagsView currentTagType={currentTagType} tags={practises} typeOf={TypeOf.SINGLE} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ReligiousPractices;
