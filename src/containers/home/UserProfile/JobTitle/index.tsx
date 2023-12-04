import React, { useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../../../../utils";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectUser,
  selectUserTags,
  setUserProfileVisibilityData,
} from "../../../../store/features/user/userSlice";
import { styles } from "./styles";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import { AppInput } from "../../../../components/atoms/AppInput";
import TagsView from "../../../../components/molecule/TagsView";
import { useSegment } from "../../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../../analytics/constants";

const JobTitle = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { user } = useAppSelector(selectUser);
  const userTags = useAppSelector(selectUserTags);

  const dispatch = useAppDispatch();

  const userId = user?.userId;

  const gradient = Colors.GRADIENT_BG;

  const input = React.useRef<HTMLInputElement>(null);

  const { currentTagType } = route?.params || {};

  const pageTitle = "Job Title";

  const analytics = useSegment();
  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.jobTitle,
      screenType: screenClass.profile,
    });

    if (input.current) {
      input.current.focus();
    }
  }, []);

  const goBackHome = () => {
    analytics.trackEvent({
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
            placeholder="Software Engineer"
            label={pageTitle}
            ref={input}
          />
        </View>
        <TagsView currentTagType={currentTagType} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default JobTitle;
