import React from "react";
import { View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Switch, TextArea } from "native-base";
import { useMutation } from "@apollo/client";
import TagScreenHeader from "../../../components/molecule/TagScreenHeader";
import { Typography } from "../../../utils";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import { CREATE_SHARE_PROFILE_FEEDBACK } from "../../../services/graphql/share-profile/mutations";

const GoDeeper = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [textAreaValue, setTextAreaValue] = React.useState("");

  const [createShareProfileFeedback] = useMutation(CREATE_SHARE_PROFILE_FEEDBACK);

  return (
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
              marginVertical: 20,
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
              backgroundColor: "white",
            }}
            onChangeText={(text) => setTextAreaValue(text)}
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
              marginBottom: 20,
            }}
          >
            let them know who is helping them
          </Text>
          <TextInput style={{ backgroundColor: "white", padding: 10 }} />
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
                  userId: "3",
                  raterId: "4",
                  templateId: "share_profile",
                },
                personalityFeedbacksInput: [
                  { personality: "Adventurous" },
                  { personality: "Agreeable" },
                  { personality: "Alert" },
                ],
                profileFeedbackInput: { name: "James Carter", description: "i like your profile" },
              },
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Submit
        </AppButton>
      </View>
    </GradientLayout>
  );
};

export default GoDeeper;
