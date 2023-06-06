import React from "react";
import { ScrollView, Text, View, Switch } from "react-native";

import { Colors } from "../../../utils";
import { styles } from "./styles";
import { TagsViewProps } from "./types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectUserProfile, setUserProfile } from "../../../store/features/user/userSlice";
import { TagsButton } from "../../atoms/TagsButton";

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

function TagsView({ currentTagType, tags, typeOf }: TagsViewProps) {
  const userProfile = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();

  const toggleSwitch = () => {
    const _data = userProfile?.map((item: any) => {
      const { tagType, visible } = item;
      if (tagType === currentTagType) {
        return {
          ...item,
          visible: !visible,
        };
      }
      return {
        ...item,
        tagType,
        visible,
      };
    });
    dispatch(
      setUserProfile({
        userProfile: _data,
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
              {tags?.map((tag: any, index) => (
                <TagsButton
                  currentTagType={currentTagType}
                  typeOf={typeOf}
                  type={tag}
                  key={index}
                  data={tag}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
      <View style={styles.switch}>
        {userProfile?.find((item: any) => item.tagType === currentTagType)?.visible ? (
          <Text style={{ fontSize: 12 }}>visible</Text>
        ) : (
          <Text style={{ fontSize: 12 }}>not visible</Text>
        )}
        <Switch
          trackColor={{ false: Colors.ICE_WHITE, true: Colors.TEAL }}
          thumbColor={Colors.WHITE}
          ios_backgroundColor={Colors.GRAY_BLUE}
          onValueChange={toggleSwitch}
          value={userProfile?.find((item: any) => item.tagType === currentTagType)?.visible}
        />
      </View>
    </View>
  );
}

export default TagsView;
