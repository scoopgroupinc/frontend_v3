import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import { DRUG_USAGE } from "../../../../utils/types/TAGS";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";
import { logEvent } from "../../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../../analytics/constants";
import { useOnScreenView } from "../../../../analytics/hooks/useOnScreenView";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const Drugs = ({ navigation, route }: any) => {
  const gradient = Colors.GRADIENT_BG;

  const { currentTagType } = route?.params || {};

  const pageTitle = "Drugs";

  const drugsTags = DRUG_USAGE;

  const goBackHome = () => {
    logEvent({
      eventName: eventNames.backEditProfileButton,
      params: { screenClass: screenClass.profile },
    });
    navigation.goBack();
  };

  useOnScreenView({
    screenName: analyticScreenNames.drugs,
    screenType: screenClass.profile,
  });

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <View style={{ marginHorizontal: "3%" }}>
          <TagScreenHeader close={goBackHome} title={pageTitle} />
        </View>
        <TagsView currentTagType={currentTagType} tags={drugsTags} typeOf={TypeOf.SINGLE} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Drugs;
