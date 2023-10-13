import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useAppSelector } from "../../../store/hooks";
import {
  selectUserTags,
  selectUserPrompts,
  selectUserProfile,
  selectUserVisuals,
  selectUserPromptsOrder,
} from "../../../store/features/user/userSlice";
import { Colors, Spacing } from "../../../utils";
import { QuotedText } from "../../../components/atoms/QuotedText";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import {
  getHometownDetails,
  getJobDetails,
  getSchoolDetails,
} from "../../../features/ProfileView/components/getDetails";
import { styles } from "../../../features/ProfileView/styles";
import { selectAllPrompts } from "../../../store/features/prompts/promptsSlice";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import { AppButton } from "../../../components/atoms/AppButton";
import { ProfilePageDetails } from "../../../features/ProfileView/components/ProfilePageDetails";
import { heightsByInch } from "../../../utils/constants/heights";
import { useGetShareLink } from "../../../hooks/useGetShareLink";

export const UserProfileView = () => {
  const userTags = useAppSelector(selectUserTags);

  const userPrompts = useAppSelector(selectUserPrompts);
  const userProfile = useAppSelector(selectUserProfile);
  const promptDisplayOrder = useAppSelector(selectUserPromptsOrder);
  const allPrompts = useAppSelector(selectAllPrompts);
  const visualsRedux = useAppSelector(selectUserVisuals);

  const visuals = useMemo(() => {
    const images = Object.values(visualsRedux);
    return images;
  }, [visualsRedux]);

  const [shareLinkToSocialMedia] = useGetShareLink();

  const [merged, setMerged] = useState<any>([]);

  useOnScreenView({ screenName: analyticScreenNames.profileView, screenType: screenClass.profile });

  useEffect(() => {
    const mergeData = () => {
      const promptIds = (promptDisplayOrder || []).filter((id) => id !== undefined);
      if (promptIds.length > 0 || (visuals && visuals.length > 0)) {
        const maxLength = Math.max(promptIds.length, visuals.length);
        setMerged([]);
        for (let i = 0; i < maxLength; i++) {
          if (visuals[i]) {
            setMerged((prev: any) => [...prev, { type: "image", image: visuals[i] }]);
          }
          const id = promptIds[i];
          if (id) {
            if (userPrompts[id]?.answer) {
              setMerged((prev: any) => [...prev, { type: "prompt", prompt: userPrompts[id] }]);
            }
          }
        }
      } else {
        setMerged([]);
        for (let i = 0; i < promptIds.length; i++) {
          const id = promptIds[i];
          if (userPrompts[id]?.answer !== "") {
            setMerged((prev: any) => [...prev, { type: "prompt", prompt: userPrompts[id] }]);
          }
        }
      }
    };
    mergeData();
  }, [visuals, promptDisplayOrder, userPrompts]);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={{
        uri: visuals ? visuals[0]?.videoOrPhoto : "../../assets/splash.png",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.whiteArc}>
          <View style={styles.descriptionContainer}>
            <View style={styles.section}>
              <Text style={styles.name}>{userProfile?.displayName}</Text>
              {userProfile?.birthday && (
                <Text style={styles.descriptionText}>
                  {moment().diff(userProfile?.birthday, "years")} years old
                </Text>
              )}
              {userProfile?.height && (
                <Text style={styles.descriptionText}>
                  {heightsByInch[userProfile?.height]?.label}
                </Text>
              )}
              {userProfile?.location?.city && (
                <Text style={styles.descriptionText}>{userProfile?.location?.city}</Text>
              )}

              {getHometownDetails(userTags)}
              {getJobDetails(userTags)}
              {getSchoolDetails(userTags)}
              <ProfilePageDetails userTags={userTags} />
            </View>
            {/* alternate prompts and images */}
            <View style={styles.content}>
              {merged.map((item: any, index: any) => {
                if (item?.type === "prompt") {
                  return (
                    <View
                      key={index}
                      style={{
                        // backgroundColor: 'red',
                        padding: Spacing.SCALE_20,
                      }}
                    >
                      <QuotedText
                        title={allPrompts[item?.prompt?.promptId]?.prompt}
                        text={item?.prompt?.answer}
                      />
                    </View>
                  );
                }
                return (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                    }}
                  >
                    <Image
                      source={{
                        uri: item?.image?.videoOrPhoto,
                      }}
                      style={{
                        width: "100%",
                        height: 300,
                        resizeMode: "cover",
                        borderRadius: 20,
                      }}
                    />
                  </View>
                );
              })}
            </View>
            <View
              style={{
                paddingHorizontal: 40,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: Colors.WHITE, padding: 20 }}>
        <AppButton colorScheme="coolGray" onPress={shareLinkToSocialMedia}>
          Share Profile Link
        </AppButton>
      </View>
    </ImageBackground>
  );
};
