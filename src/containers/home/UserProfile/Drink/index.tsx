import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import { DRINKS } from "../../../../utils/types/TAGS";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";
import { NavigationScreenProps } from "../../../../utils/types/globals";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const Drink = ({ navigation, route }: NavigationScreenProps) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const { currentTagType } = route?.params;

  const pageTitle = "Drinks";

  const drinksTag = DRINKS;

  const goBackHome = () => {
    // logEvent({
    //   eventName: eventNames.backEditProfileButton,
    //   params: { screenClass: screenClass.profile },
    // });
    navigation.goBack();
  };

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <TagScreenHeader close={goBackHome} title={pageTitle} />
        <TagsView currentTagType={currentTagType} tags={drinksTag} typeOf={TypeOf.ARRAY} />
      </SafeAreaView>
    </LinearGradient>
  );
}

export default Drink;
