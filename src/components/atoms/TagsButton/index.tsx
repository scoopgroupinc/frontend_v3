/* eslint-disable import/prefer-default-export */
import React, { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Text, View } from "react-native";

import { Colors } from "../../../utils";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectUserId,
  selectUserTags,
  setUserProfileVisibilityData,
} from "../../../store/features/user/userSlice";

interface TagButtonProps {
  typeOf?: string;
  data: Tag;
  currentTagType: string;
}

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

interface Tag {
  name: string;
  emoji: string;
  id: number;
  visible: boolean;
}

interface UserTag {
  userId: string;
  tagName: string;
  tagId: number;
  tagType: string;
}

export const TagsButton = ({ currentTagType, typeOf, data }: TagButtonProps) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];
  const [tags, setTags] = useState<any>([]);

  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const userTagsVisible = useAppSelector(selectUserTags);

  const handleMulipleBtns = useCallback(() => {
    const isExist = tags?.find((item: any) => item.tagName === data.name);
    let userTags = [];
    if (isExist) {
      userTags = [...tags.filter((item: any) => item.tagName !== data.name)];
    } else {
      userTags = [...tags, { userId, tagName: data.name, tagType: currentTagType, tagId: data.id }];
    }
    setTags(userTags);
    const profile = {
      ...userTagsVisible,
      [currentTagType]: {
        ...userTagsVisible[currentTagType],
        userTags,
      },
    };
    dispatch(setUserProfileVisibilityData({ userTags: profile }));
  }, [currentTagType, data, dispatch, tags, userTagsVisible, userId]);

  const handleSingleBtn = () => {
    dispatch(
      setUserProfileVisibilityData({
        userTags: {
          ...userTagsVisible,
          [currentTagType]: {
            ...userTagsVisible[currentTagType],
            userTags: [{ userId, tagName: data.name, tagType: currentTagType, tagId: data.id }],
          },
        },
      })
    );
  };

  useEffect(() => {
    const rst = userTagsVisible[currentTagType];
    setTags(rst?.userTags || []);
  }, [currentTagType, userTagsVisible]);

  return (
    <TouchableOpacity onPress={typeOf === TypeOf.ARRAY ? handleMulipleBtns : handleSingleBtn}>
      <LinearGradient start={[0, 0.5]} end={[1, 0.5]} colors={gradient} style={styles.gradient}>
        <View
          style={
            typeOf === TypeOf.ARRAY
              ? [
                  styles.circleGradient,
                  {
                    backgroundColor: tags?.find((item: any) => item.tagName === data.name)
                      ? Colors.TRANSPARENT
                      : Colors.WHITE,
                  },
                ]
              : [
                  styles.circleGradient,
                  {
                    backgroundColor:
                      tags && tags[0]?.tagName === data.name ? Colors.TRANSPARENT : Colors.WHITE,
                  },
                ]
          }
        >
          <Text style={styles.text}>{data.name}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};
