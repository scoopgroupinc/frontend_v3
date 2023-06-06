import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../utils";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";
import { SPORTS } from "../../../../utils/types/TAGS";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const Sports = ({ navigation, route }: any) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const { currentTagType } = route?.params;

  const pageTitle = "Sports";

  const sportsTag = SPORTS;

  const goBackHome = () => {
    // logEvent({
    //   eventName: eventNames.backEditProfileButton,
    //   params: { screenClass: screenClass.profile },
    // });
    navigation.goBack();
  };

  // useEffect(() => {
  //   onScreenView({
  //     screenName: screenNames.sports,
  //     screenType: screenClass.profile,
  //   });
  // }, []);

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <TagScreenHeader close={goBackHome} title={pageTitle} />
        <TagsView currentTagType={currentTagType} tags={sportsTag} typeOf={TypeOf.ARRAY} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Sports;
