import React from "react";
import { View, Text } from "react-native";
import moment from "moment";
import { Colors, Typography } from "../../../utils";
import Tags from "../../atoms/Tags";
import { styles } from "./styles";

const customStyles = {
  borderColor: Colors.TEAL,
  backgroundColor: Colors.TEAL,
  color: Colors.WHITE,
  fontFamily: Typography.FONT_CAPRIOLA_REGULAR,
  fontSize: 12,
};

const FeedbackComment = (props: any) => {
  const { feedback } = props;

  return (
    <>
      {feedback.map((fb: any) => (
        <View style={styles.body} key={fb.id}>
          <View style={styles.tagsBody}>
            {fb?.personalityFeedbacks.map((item: any) => (
              <Tags key={item?.id} title={item?.personality} style={customStyles} />
            ))}
          </View>
          <Text style={styles.text}>{fb?.profileFeedback?.description}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View>
              <Text style={styles.author}>{fb?.profileFeedback?.name}</Text>
              <Text style={styles.dateTime}>
                {moment(feedback?.profileFeedback?.createdAt).format("DD MMM YYYY")}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default FeedbackComment;
