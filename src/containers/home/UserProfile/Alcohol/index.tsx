import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import { ALCOHOL } from "../../../../utils/types/TAGS";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";
import { logEvent, onScreenView } from "../../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../../analytics/constants";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};
const Alcohol = ({ navigation, route }: any) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const { currentTagType } = route?.params || {};

  const pageTitle = "Alcohol";

  const alcoholTags = ALCOHOL;

  const goBackHome = () => {
    logEvent({
      eventName: eventNames.backEditProfileButton,
      params: {
        screenClass: screenClass.profile,
      },
    });
    navigation.goBack();
  };

  useEffect(() => {
    onScreenView({
      screenName: analyticScreenNames.alcohol,
      screenType: screenClass.profile,
    });
  }, []);

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <TagScreenHeader close={goBackHome} title={pageTitle} />
        <TagsView currentTagType={currentTagType} tags={alcoholTags} typeOf={TypeOf.SINGLE} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Alcohol;
