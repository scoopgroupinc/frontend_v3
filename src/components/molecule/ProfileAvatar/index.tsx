import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ProfileAvatar = ({
  displayPhoto,
  settings,
}: {
  displayPhoto?: string;
  settings?: Boolean;
}) => {
  return (
    <View style={styles.avatarCon}>
      <Image
        source={{
          uri: displayPhoto,
        }}
        style={styles.avatar}
      />
      {!settings && (
        <View style={styles.profileLevel}>
          <MaterialCommunityIcons
            name="account-edit-outline"
            size={20}
            color={"#fff"}
          />
        </View>
      )}
    </View>
  );
};
