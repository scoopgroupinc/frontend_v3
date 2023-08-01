import React, { useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import TagScreenHeader from "../../../components/molecule/TagScreenHeader";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import ButtonPill from "../../../components/atoms/ButtonPill";
import { Colors, Typography } from "../../../utils";
import { colors } from "../../app/themeConstants";
import Tags from "../../../components/atoms/Tags";
import { FONT_FAMILY } from "../../../utils/typography/fonts";
import FeedbackComment from "../../../components/molecule/FeedbackComment";

const ProfileFeedback = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  useEffect(() => {});
  return (
    <GradientLayout>
      <TagScreenHeader title="Profile Feedback" close={() => navigation.navigate("")} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.TEAL,
            backgroundColor: Colors.TEAL,
            padding: 10,
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 15,
              fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
            }}
          >
            Copy share link
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.WHITE,
            backgroundColor: Colors.WHITE,
            padding: 10,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: Colors.BLACK,
                fontSize: 15,
                fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
                marginHorizontal: 10,
              }}
            >
              Activated
            </Text>
            <FontAwesome name="arrow-down" size={16} color={Colors.BLACK} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 20 }}>
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: FONT_FAMILY.Capriola_400Regular,
            marginVertical: 10,
          }}
        >
          Top personality traits:
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 10,
          }}
        >
          <Tags title="100% friendly" />
          <Tags title="20% joyful" />
          <Tags title="100% charismatic" />
        </View>
        <FeedbackComment />
      </View>
    </GradientLayout>
  );
};

export default ProfileFeedback;
