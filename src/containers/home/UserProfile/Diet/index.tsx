import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import { DIET } from "../../../../utils/types/TAGS";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const Diet = ({ navigation, route }: any) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const { currentTagType } = route?.params;

  const pageTitle = "Diet";

  const dietTags = DIET;

  const goBackHome = () => {
    // logEvent({
    //   eventName: eventNames.backEditProfileButton,
    //   params: { screenClass: screenClass.profile },
    // });
    navigation.goBack();
  };

  // useEffect(() => {
  //   onScreenView({
  //     screenName: screenNames.diet,
  //     screenType: screenClass.profile,
  //   });
  // }, []);

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <TagScreenHeader close={goBackHome} title="Diet" />
        <TagsView currentTagType={currentTagType} tags={dietTags} typeOf={TypeOf.ARRAY} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Diet;
