import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../utils";
import { STAYING_IN } from "../../../../utils/types/TAGS";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const StayingIn = ({ navigation, route }: any) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const { currentTagType } = route?.params;

  const pageTitle = "Staying In";

  const stayingInTag = STAYING_IN;

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
        <TagsView currentTagType={currentTagType} tags={stayingInTag} typeOf={TypeOf.ARRAY} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default StayingIn;
