/* eslint-disable global-require */
import { Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { useAppDispatch } from "../../../store/hooks";
import { updateUser } from "../../../store/features/user/userSlice";
import { screenName } from "../../../utils/constants";
import { useGetShareLink } from "../../../hooks/useGetShareLink";
import { Colors } from "../../../utils";
import { getStringData, storeStringData } from "../../../utils/storage";
import { useSegment } from "../../../analytics";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";

const ShareModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [checkbox, setCheckbox] = useState(false);

  const handleCheckboxToggle = () => {
    setCheckbox(!checkbox);
    storeStringData("shareLinkAlert", checkbox ? "false" : "true");
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: 300,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.RUST,
            }}
          >
            <Text style={{ alignSelf: "center", fontSize: 16 }}>Share Profile Link</Text>
            <Text style={{ marginBottom: 20, marginTop: 10 }}>
              Once you recieve feedback, you can see it in the main view.
            </Text>

            <TouchableOpacity onPress={() => handleCheckboxToggle()}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "black",
                    marginRight: 10,
                    backgroundColor: checkbox ? Colors.TEAL : "white",
                  }}
                />
                <Text>Don't show again</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={{ alignSelf: "center" }}>
              <Text style={{ color: Colors.RUST, marginTop: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const ShareForFeedback = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const analytics = useSegment();

  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.onBoardingEnd,
      screenType: screenClass.onBoarding,
    });
  }, []);

  const [shareLinkToSocialMedia] = useGetShareLink();

  const gotoProfileEditView = (value: string) => {
    dispatch(
      updateUser({
        value: {
          isOnboarded: true,
        },
      })
    );
    navigation.navigate(screenName.USER_PROFILE, {
      screen: screenName.TOGGLE_PROFILE_VIEW,
      params: { value },
    });
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = async () => {
    const alertState = await getStringData("shareLinkAlert");
    if (alertState) {
      setModalVisible(false);
      shareLinkToSocialMedia();
    } else {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    shareLinkToSocialMedia();
  };

  return (
    <GradientLayout>
      <View style={styles.headingBody}>
        <Image
          source={require("../../../assets/images/facets-logo.png")}
          style={{ height: 80, width: 80 }}
        />
        <View style={styles.textBody}>
          <Text style={styles.title}>Share your profile and get feedback</Text>
        </View>
      </View>
      <View style={styles.buttonsBody}>
        <AppButton style={styles.btn} onPress={openModal}>
          Get Share Link
        </AppButton>
        <AppButton style={styles.btn} onPress={() => gotoProfileEditView("View")}>
          Preview Profile
        </AppButton>
        <AppButton style={styles.btn} onPress={() => gotoProfileEditView("Edit")}>
          Continue Editing Profile
        </AppButton>
      </View>
      <ShareModal visible={modalVisible} onClose={closeModal} />
    </GradientLayout>
  );
};
export default ShareForFeedback;
