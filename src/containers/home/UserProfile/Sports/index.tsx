import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";
import { PHYSICAL_ACTIVITY } from "../../../../utils/types/TAGS";
import { analyticScreenNames, eventNames, screenClass } from "../../../../analytics/constants";
import { logEvent } from "../../../../analytics";
import { useOnScreenView } from "../../../../analytics/hooks/useOnScreenView";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const Sports = ({ navigation, route }: any) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const { currentTagType } = route?.params || {};

  const pageTitle = "Sports";

  const sportsTag = PHYSICAL_ACTIVITY;

  useOnScreenView({
    screenName: analyticScreenNames.sports,
    screenType: screenClass.profile,
  });

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
        <View style={{ marginHorizontal: "3%" }}>
          <TagScreenHeader close={goBackHome} title={pageTitle} />
        </View>
        <TagsView currentTagType={currentTagType} tags={sportsTag} typeOf={TypeOf.ARRAY} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Sports;
