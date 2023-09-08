import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Switch } from "native-base";
import { useMutation } from "@apollo/client";
import TagScreenHeader from "../../../components/molecule/TagScreenHeader";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { AppButton } from "../../../components/atoms/AppButton";
import { CREATE_SHARE_PROFILE_FEEDBACK } from "../../../services/graphql/share-profile/mutations";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userSlice";
import { selectFeedbackUser } from "../../../store/features/feedback/feedbackSlice";
import AppActivityIndicator from "../../../components/atoms/ActivityIndicator";
import { screenName } from "../../../utils/constants";
import { styles } from "./styles";

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
                color: "#fff",
                marginBottom: 10,
              }}
            >
              What does my profile say to you?
            </Text>
            <TextInput
              multiline
              placeholder="Details"
              style={[styles.textAreaContainer, styles.textarea]}
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.name}>Name (Optional)</Text>
            <Text style={styles.info}>let them know who is helping them</Text>
            <View style={styles.inputBody}>
              <TextInput style={styles.input} value={name} onChangeText={setName} />
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
            <Text style={styles.switchText}>Allow users to chat with you</Text>
            <Switch
              size="sm"
              colorScheme="emerald"
              onToggle={() => {
                Alert.alert("Feature Coming Soon");
              }}
            />
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
