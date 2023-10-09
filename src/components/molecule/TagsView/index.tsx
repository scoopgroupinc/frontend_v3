import React from "react";
import { ScrollView, Text, View, Switch } from "react-native";

import { Colors } from "../../../utils";
import { styles } from "./styles";
import { TagsViewProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectUserTags,
  setUserProfileVisibilityData,
} from "../../../store/features/user/userSlice";
import { TagsButton } from "../../atoms/TagsButton";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

const TagsView = ({ currentTagType, tags, typeOf }: TagsViewProps) => {
  const userTags = useAppSelector(selectUserTags);
  const dispatch = useAppDispatch();

  const toggleSwitch = () => {
    const data = {
      ...userTags,
      [currentTagType]: {
        ...userTags[currentTagType],
        visible: !userTags[currentTagType]?.visible,
      },
    };

    dispatch(
      setUserProfileVisibilityData({
        userTags: data,
      })
    );
  };

  return (
    <View style={styles.tagContainer}>
      {tags && (
        <>
          {typeOf === TypeOf.ARRAY ? (
            <Text style={styles.pageTitle}>Select all that apply</Text>
          ) : (
            <Text style={styles.pageTitle}>Choose one</Text>
          )}

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            <View>
              {tags?.map((tag: any) => (
                <TagsButton
                  currentTagType={currentTagType}
                  typeOf={typeOf}
                  key={tag.id}
                  data={tag}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
      <View style={styles.switch}>
        {userTags[currentTagType]?.visible ? (
          <Text style={{ fontSize: 12 }}>visible</Text>
        ) : (
          <Text style={{ fontSize: 12 }}>not visible</Text>
        )}
        <Switch
          trackColor={{ false: Colors.ICE_WHITE, true: Colors.TEAL }}
          thumbColor={Colors.WHITE}
          ios_backgroundColor={Colors.GRAY_BLUE}
          onValueChange={toggleSwitch}
          value={userTags[currentTagType]?.visible}
        />
      </View>
    </View>
  );
};

export default TagsView;
