import React from "react";
import { Modal } from "react-native";
import { Colors } from "../../../utils";
import { AppIconButton } from "../AppIconButton";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

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
          <MaterialIcons name="keyboard-arrow-down" size={30} color={Colors.ICON_FILL} />
        </AppIconButton>
        {children}
      </SafeAreaView>
    </Modal>
  );
};
