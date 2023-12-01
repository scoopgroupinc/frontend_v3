import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";
import { PHYSICAL_ACTIVITY } from "../../../../utils/types/TAGS";
import { analyticScreenNames, eventNames, screenClass } from "../../../../analytics/constants";
import { useSegment } from "../../../../analytics";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const Sports = ({ navigation, route }: any) => {
  const gradient = Colors.GRADIENT_BG;

  const { currentTagType } = route?.params || {};

  const pageTitle = "Sports";

  const sportsTag = PHYSICAL_ACTIVITY;

  const analytics = useSegment();
  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.sports,
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
        <TagsView currentTagType={currentTagType} tags={sportsTag} typeOf={TypeOf.ARRAY} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Sports;
