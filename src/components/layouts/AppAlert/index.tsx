import React from "react";
import { View, Modal } from "react-native";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { AppIconButton } from "../AppIconButton";
import { Colors } from "../../../utils";

interface AlertType {
  children: React.ReactNode;
  state: boolean;
  close: () => void;
}

export const AppAlert = ({ state, children, close }: AlertType) => (
    <Modal visible={state} transparent animationType="fade">
      <BlurView intensity={70} tint="dark" style={styles.modalView}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <AppIconButton onPress={close}>
              <MaterialIcons name="close" size={20} color={Colors.ICON_FILL} />
            </AppIconButton>
          </View>
          {children}
        </View>
      </BlurView>
    </Modal>
  )
