import React from "react";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../../utils";
import { AppIconButton } from "../AppIconButton";
import { styles } from "./styles";

interface ModalType {
  children: React.ReactNode;
  state: boolean;
  align?: boolean;
  close: () => void;
}

export const SlideUpModal = ({ state, children, close, align }: ModalType) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={state} transparent animationType="slide">
      <SafeAreaView
        style={[
          styles.container,
          align && styles.align,
          {
            marginTop: insets.top,
          },
        ]}
      >
        <AppIconButton style={align ? styles.close : undefined} onPress={close}>
          <Ionicons name="ios-chevron-down" size={30} color={Colors.ICON_FILL} />
        </AppIconButton>
        {children}
      </SafeAreaView>
    </Modal>
  );
};
