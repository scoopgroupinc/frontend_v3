import React from "react";
import { View, Text } from "react-native";
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
  //   const { text,tags,name,dateTime } = props;
  const text = "Nice overall! Try putting a better picture for your main one";
  const tags = ["cliff", "kwadwo", "owusu"];
  const name = "Michelle";
  const dateTime = "July 25, 2021";

  return (
    <View style={styles.body}>
      <View style={styles.tagsBody}>
        {tags.map((name) => (
          <Tags title={name} style={customStyles} />
        ))}
      </View>
      <Text style={styles.text}>{text}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <View>
          <Text style={styles.author}>{name}</Text>
          <Text style={styles.dateTime}>{dateTime}</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedbackComment;
