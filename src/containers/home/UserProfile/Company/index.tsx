import React, { useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

import {
  selectUser,
  selectUserProfile,
  setUserProfile,
} from "../../../../store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import TagsView from "../../../../components/molecule/TagsView";
import { Colors } from "../../../../utils";
import { AppInput } from "../../../../components/atoms/AppInput";
import { analyticScreenNames, screenClass } from "../../../../analytics/constants";
import { useOnScreenView } from "../../../../analytics/hooks/useOnScreenView";

const Company = ({ navigation, route }: any) => {
  const userProfile = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;

  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

  const input = React.useRef<HTMLInputElement>(null);

  const { currentTagType } = route?.params || {};

  const pageTitle = "Company";

  const goBackHome = () => {
    // logEvent({
    //   eventName: eventNames.backEditProfileButton,
    //   params:{screenClass:screenClass.profile,}
    // })
    navigation.goBack();
  };

  useOnScreenView({
    screenName: analyticScreenNames.company,
    screenType: screenClass.profile
  });

  useEffect(() => {
    if (userProfile) {
      const isTagTypeInUserProfile = userProfile?.find(
        (item: any) => item.tagType === currentTagType
      );
      if (!isTagTypeInUserProfile) {
        const _data = userProfile?.map((item: any) => {
          const { tagType, userTags } = item;
          if (tagType === currentTagType) {
            return {
              ...item,
              userTags: [{ userId, tagName: "" }],
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
            userProfile: _data,
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  return (
    <LinearGradient style={styles.container} colors={gradient}>
      <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "top"]}>
        <TagScreenHeader close={goBackHome} title={pageTitle} />
        <View style={styles.input}>
          <AppInput
            value={
              userProfile?.find((item: any) => item.tagType === currentTagType)?.userTags[0]
                ?.tagName
            }
            onChangeText={(text: string) => {
              const _data = userProfile?.map((item: any) => {
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
                  userProfile: _data,
                })
              );
            }}
            placeholder="Google"
            label={pageTitle}
            ref={input}
          />
        </View>
        <TagsView currentTagType={currentTagType} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Company;
