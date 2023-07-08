import React, { useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Colors } from "../../../../utils";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectUser,
  selectUserProfile,
  setUserProfile,
} from "../../../../store/features/user/userSlice";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import { AppInput } from "../../../../components/atoms/AppInput";
import TagsView from "../../../../components/molecule/TagsView";
import { analyticScreenNames, eventNames, screenClass } from "../../../../analytics/constants";
import { logEvent, onScreenView } from "../../../../analytics";

const School = ({ navigation, route }: any) => {
  const userProfile = useAppSelector(selectUserProfile);
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

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
    onScreenView({
      screenName: analyticScreenNames.school,
      screenType: screenClass.profile,
    });
  }, []);

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <TagScreenHeader close={goBackHome} title={pageTitle} />
        <View style={styles.input}>
          <AppInput
            value={
              userProfile?.find((item: any) => item.tagType === currentTagType)?.userTags?.[0]
                ?.tagName
            }
            onChangeText={(text: string) => {
              const data = userProfile?.map((item: any) => {
                const { tagType, userTags } = item;
                if (tagType === currentTagType) {
                  return {
                    ...item,
                    userTags: [{ userId, tagType: currentTagType, tagName: text }],
                  };
                }
                return {
                  ...item,
                  tagType,
                  userTags,
                };
              });
              dispatch(
                setUserProfile({
                  userProfile: data,
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
