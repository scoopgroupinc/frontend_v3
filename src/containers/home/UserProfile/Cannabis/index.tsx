import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import { CANNABIS_USAGE } from "../../../../utils/types/TAGS";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";
import { analyticScreenNames, eventNames, screenClass } from "../../../../analytics/constants";
import { useSegment } from "../../../../analytics";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const Cannabis = ({ navigation, route }: any) => {
  const gradient = Colors.GRADIENT_BG;

  const { currentTagType } = route?.params || {};

  const pageTitle = "Cannabis";

  const cannabisTags = CANNABIS_USAGE;

  const analytics = useSegment();
  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.cannabis,
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
        <TagsView currentTagType={currentTagType} tags={cannabisTags} typeOf={TypeOf.SINGLE} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Cannabis;
