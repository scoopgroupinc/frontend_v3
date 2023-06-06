import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Text, View } from "react-native";

import { Colors } from "../../../utils";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectUser,
  selectUserProfile,
  setUserProfile,
} from "../../../store/features/user/userSlice";

interface TagButtonProps {
  typeOf?: string;
  type: string;
  data: Tag;
  currentTagType: string;
}

const TypeOf = {
  SINGLE: "single",
  ARRAY: "array",
};

interface Tag {
  name: string;
}

export const TagsButton = ({ currentTagType, typeOf, data }: TagButtonProps) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];
  const [tags, setTags] = useState<any>([]);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const userId = user?.userId;

  const userProfile = useAppSelector(selectUserProfile);

  const handleMulipleBtns = () => {
    const rst = userProfile?.find((item: any) => item.tagType === currentTagType);
    const isExist = tags?.find((item: any) => item.tagName === data.name);
    if (isExist) {
      setTags([...tags.filter((item: any) => item.tagName !== data.name)]);
      dispatch(
        setUserProfile({
          userProfile: [
            ...userProfile.filter((item: any) => item.tagType !== currentTagType),
            {
              ...rst,
              userTags: [...tags.filter((item: any) => item.tagName !== data.name)],
            },
          ],
        })
      );
    } else {
      setTags([...tags, { userId, tagName: data.name, tagType: currentTagType }]);
      dispatch(
        setUserProfile({
          userProfile: [
            ...userProfile.filter((item: any) => item.tagType !== currentTagType),
            {
              ...rst,
              userTags: [...tags, { userId, tagName: data.name, tagType: currentTagType }],
            },
          ],
        })
      );
    }
  };

  const handleSingleBtn = () => {
    const rst = userProfile.find((item: any) => item.tagType === currentTagType);
    dispatch(
      setUserProfile({
        userProfile: [
          ...userProfile.filter((item: any) => item.tagType !== currentTagType),
          {
            ...rst,
            userTags: [{ userId, tagName: data.name, tagType: currentTagType }],
          },
        ],
      })
    );
  };

  useEffect(() => {
    const rst = userProfile?.find((item: any) => item.tagType === currentTagType);
    setTags(rst?.userTags);
  }, [userProfile]);

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
                      tags[0]?.tagName === data.name ? Colors.TRANSPARENT : Colors.WHITE,
                  },
                ]
          }
        >
          <Text style={styles.text}>{data.name}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
