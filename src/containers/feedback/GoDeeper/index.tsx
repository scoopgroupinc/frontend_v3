import React, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Switch, TextArea } from "native-base";
import { useMutation } from "@apollo/client";
import TagScreenHeader from "../../../components/molecule/TagScreenHeader";
import { Colors, Spacing, Typography } from "../../../utils";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import { CREATE_SHARE_PROFILE_FEEDBACK } from "../../../services/graphql/share-profile/mutations";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userSlice";
import { selectFeedbackUser } from "../../../store/features/feedback/feedbackSlice";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { screenName } from "../../../utils/constants";

const GoDeeper = ({ route }: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [description, setDescription] = useState("");
  const { user } = useAppSelector(selectUser);
  const [name, setName] = useState("");
  const feedBackUser = useAppSelector(selectFeedbackUser);

  const { selectedButtons } = route.params;

  const [createShareProfileFeedback, { loading }] = useMutation(CREATE_SHARE_PROFILE_FEEDBACK);

  useEffect(() => {
    setName(`${user?.firstName} ${user?.lastName}`);
  }, [user]);

  return (
    <>
      <AppActivityIndicator visible={loading} />
      <GradientLayout>
        <TagScreenHeader title="Go Deeper" close={() => navigation.goBack()} />
        <View
          style={{
            flex: 2,
            flexDirection: "column",
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
                marginBottom: 10,
              }}
            >
              What does my profile say to you?
            </Text>
            <TextArea
              h={20}
              placeholder="Details"
              w="100%"
              autoCompleteType={undefined}
              numberOfLines={4}
              fontFamily={Typography.FONT_CAPRIOLA_REGULAR}
              style={{
                backgroundColor: "#fff",
              }}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
              }}
            >
              Name (Optional)
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "white",
                fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
              }}
            >
              let them know who is helping them
            </Text>
            <View
              style={{
                width: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={{
                  borderWidth: 4,
                  width: "100%",
                  borderRadius: Spacing.SCALE_8,
                  padding: Spacing.SCALE_12,
                  borderColor: Colors.INPUT_BORDER,
                  backgroundColor: Colors.INPUT_BG,
                  fontFamily: Typography.FONT_POPPINS_REGULAR,
                  fontSize: Typography.FONT_SIZE_16,
                  marginTop: Spacing.SCALE_8,
                  overflow: "hidden",
                  shadowColor: Colors.BLACK,
                  shadowOffset: {
                    width: 9,
                    height: 1,
                  },
                  shadowOpacity: 0.15,
                  shadowRadius: 14,
                  elevation: -8,
                }}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
              }}
            >
              Allow users to chat with you
            </Text>
            <Switch size="sm" colorScheme="emerald" />
          </View>
          <AppButton
            onPress={() => {
              createShareProfileFeedback({
                variables: {
                  feedbackGroupInput: {
                    userId: feedBackUser?.userId,
                    raterId: user?.id,
                    templateId: "share_profile",
                  },
                  personalityFeedbacksInput: selectedButtons.map((button: any) => ({
                    personality: button,
                  })),
                  profileFeedbackInput: {
                    name: name ? "" : "Anonymous",
                    description,
                  },
                },
              })
                .then(() => {
                  navigation.navigate(screenName.AUTHORIZEDFEEDBACKUSER);
                })
                .catch(() => {});
            }}
          >
            Submit
          </AppButton>
        </View>
      </GradientLayout>
    </>
  );
};

export default GoDeeper;
