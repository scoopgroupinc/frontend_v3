/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@apollo/client";
import TagScreenHeader from "../../../components/molecule/TagScreenHeader";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import Tags from "../../../components/atoms/Tags";
import FeedbackComment from "../../../components/molecule/FeedbackComment";
import { styles } from "./styles";
import {
  DEACTIVATE_PROFILE_LINK,
  ACTIVATE_PROFILE_LINK,
  GET_USER_SHARE_PROFILE_LINK,
} from "../../../services/graphql/user-link/mutations";
import { AppButton } from "../../../components/atoms/AppButton";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { useShare } from "../../../hooks/useShare";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userSlice";
import { selectFeedbacks } from "../../../store/features/feedback/feedbackSlice";
import { encryptData } from "../../../utils/helpers";

interface PersonalityFeedback {
  personality: string;
}

interface Feedback {
  personalityFeedbacks: PersonalityFeedback[];
}

const UserProfileFeedback = () => {
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;

  const feedback = useAppSelector(selectFeedbacks);

  const [pesPercentage, setPesPercentage] = useState<any>([]);
  useEffect(() => {
    function calculatePersonalityPercentages(feedbacks: Feedback[]): any[] {
      const personalityCount: { [personality: string]: number } = {};

      for (const fb of feedbacks) {
        for (const personalityFeedback of fb.personalityFeedbacks) {
          const { personality } = personalityFeedback;
          personalityCount[personality] = (personalityCount[personality] || 0) + 1;
        }
      }

      const totalFeedbacks = feedbacks.length;
      const result: { name: string; percentage: string }[] = [];

      for (const personality in personalityCount) {
        const percentage = ((personalityCount[personality] / totalFeedbacks) * 100).toFixed(2);
        result.push({ name: personality, percentage });
      }
      setPesPercentage(result);
    }

    calculatePersonalityPercentages(feedback);
  }, [feedback]);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [shareLink, setShareLink] = useState<any>(null);

  const { share } = useShare();

  const [getShareLink] = useMutation(GET_USER_SHARE_PROFILE_LINK);
  useEffect(() => {
    getShareLink({
      variables: {
        userId,
      },
    }).then((res) => {
      const link = res.data.getUserShareProfileLink;
      setShareLink(link);
    });
  }, [getShareLink, userId]);

  const [
    deactivateProfileLink,
    { data: deactivateLinkData, loading: deactivateProfileLinkLoading },
  ] = useMutation(DEACTIVATE_PROFILE_LINK, {
    variables: {
      id: shareLink?.id,
    },
  });
  useEffect(() => {
    if (deactivateLinkData) {
      setShareLink(deactivateLinkData.updateUserLinkState);
    }
  }, [deactivateLinkData]);

  const [activateProfileLink, { data: activateLinkData, loading: activateProfileLinkLoading }] =
    useMutation(ACTIVATE_PROFILE_LINK, {
      variables: {
        id: shareLink?.id,
      },
    });
  useEffect(() => {
    if (activateLinkData) {
      setShareLink(activateLinkData.updateUserLinkState);
    }
  }, [activateLinkData]);

  const handleActivation = (state: string) => {
    if (state === "activate") {
      Alert.alert(
        "Activate Share Link",
        "Activate your share link. Anyone using the link will be able to see your profile",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Activate",
            onPress: () => activateProfileLink(),
          },
        ]
      );
    } else {
      Alert.alert(
        "Deactivate Share Link",
        "Your share link will no longer work. Anyone using the link will no longer see your profile",

        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Deactivate",
            onPress: () => deactivateProfileLink(),
          },
        ]
      );
    }
  };

  const shareLinkToSocialMedia = () => {
    const cipherLink = encryptData(shareLink);
    share(cipherLink);
  };

  return (
    <>
      <AppActivityIndicator visible={activateProfileLinkLoading || deactivateProfileLinkLoading} />
      <GradientLayout>
        <TagScreenHeader title="Profile Feedback" close={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: 150,
              }}
            >
              <AppButton
                style={{ flex: 2 }}
                colorScheme="teal"
                isDisabled={shareLink?.state === "inactive"}
                onPress={shareLinkToSocialMedia}
              >
                Copy share link
              </AppButton>
            </View>
            {shareLink?.state === "inactive" ? (
              <AppButton
                style={{
                  width: 150,
                }}
                onPress={() => {
                  handleActivation("activate");
                }}
              >
                Activate
              </AppButton>
            ) : (
              <AppButton
                style={{
                  width: 150,
                }}
                onPress={() => handleActivation("deactivate")}
              >
                Deactivate
              </AppButton>
            )}
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.traitsText}>Top personality traits:</Text>
            <View style={styles.tagsBody}>
              {pesPercentage?.map((pes: any) => (
                <View key={pes.name} style={styles.tagsBody}>
                  <Tags title={`${Math.trunc(pes.percentage)}% ${pes.name}`} />
                </View>
              ))}
            </View>
            <FeedbackComment feedback={feedback} />
          </View>
        </ScrollView>
      </GradientLayout>
    </>
  );
};

export default UserProfileFeedback;
