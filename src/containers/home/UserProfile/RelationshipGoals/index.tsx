import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../../utils";
import { RELATIONSHIP_GOALS } from "../../../../utils/types/TAGS";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const RelationshipGoals = ({ navigation, route }: any) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const { currentTagType } = route?.params;

  const pageTitle = "Relationship Goals";

  const relationshipGoalsTags = RELATIONSHIP_GOALS;

  const goBackHome = () => {
    // logEvent({
    //   eventName: eventNames.backEditProfileButton,
    //   params: { screenClass: screenClass.profile },
    // });
    navigation.goBack();
  };

  // useEffect(() => {
  //   onScreenView({
  //     screenName: screenNames.relationshipGoals,
  //     screenType: screenClass.profile,
  //   });
  // }, []);

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <TagScreenHeader close={goBackHome} title={pageTitle} />
        <TagsView
          currentTagType={currentTagType}
          tags={relationshipGoalsTags}
          typeOf={TypeOf.ARRAY}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RelationshipGoals;
