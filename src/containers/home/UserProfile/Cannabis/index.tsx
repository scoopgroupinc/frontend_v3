import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import { CANNABIS } from "../../../../utils/types/TAGS";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";
import { logEvent, onScreenView } from "../../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../../analytics/constants";
import { useOnScreenView } from "../../../../analytics/hooks/useOnScreenView";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const Cannabis = ({ navigation, route }: any) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const { currentTagType } = route?.params || {};

  useOnScreenView({
    screenName: analyticScreenNames.cannabis,
    screenType: screenClass.profile
  });

  const pageTitle = "Cannabis";

  const cannabisTags = CANNABIS;

  const goBackHome = () => {
    logEvent({
      eventName: eventNames.backEditProfileButton,
      params: { screenClass: screenClass.profile },
    });
    navigation.goBack();
  };

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <TagScreenHeader close={goBackHome} title={pageTitle} />
        <TagsView currentTagType={currentTagType} tags={cannabisTags} typeOf={TypeOf.SINGLE} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Cannabis;
