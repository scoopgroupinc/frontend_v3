import React, { useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectUser,
  selectUserTags,
  setUserProfileVisibilityData,
} from "../../../../store/features/user/userSlice";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import { AppInput } from "../../../../components/atoms/AppInput";
import TagsView from "../../../../components/molecule/TagsView";
import { analyticScreenNames, eventNames, screenClass } from "../../../../analytics/constants";
import { logEvent } from "../../../../analytics";
import { useOnScreenView } from "../../../../analytics/hooks/useOnScreenView";

const School = ({ navigation, route }: any) => {
  const userTags = useAppSelector(selectUserTags);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;

  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const input = React.useRef<HTMLInputElement>(null);

  const { currentTagType } = route?.params || {};

  const pageTitle = "School";

  const goBackHome = () => {
    logEvent({
      eventName: eventNames.backEditProfileButton,
      params: { screenClass: screenClass.profile },
    });
    navigation.goBack();
  };

  useOnScreenView({
    screenName: analyticScreenNames.school,
    screenType: screenClass.profile,
  });

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <View style={{ marginHorizontal: "3%" }}>
          <TagScreenHeader close={goBackHome} title={pageTitle} />
        </View>
        <View style={styles.input}>
          <AppInput
            value={userTags[currentTagType]?.userTags?.[0]?.tagName}
            onChangeText={(text: string) => {
              const data = {
                ...userTags,
                [currentTagType]: {
                  ...userTags[currentTagType],
                  userTags: [{ userId, tagType: currentTagType, tagName: text }],
                },
              };

              dispatch(
                setUserProfileVisibilityData({
                  userTags: data,
                })
              );
            }}
            placeholder="University of California"
            label={pageTitle}
            ref={input}
          />
        </View>
        <TagsView currentTagType={currentTagType} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default School;
