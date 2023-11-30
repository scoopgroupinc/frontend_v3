import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { useAppSelector } from "../../../store/hooks";
import {
  selectUserTags,
  selectUserPrompts,
  selectUserProfile,
  selectUserVisuals,
  selectUserPromptsOrder,
  selectUserLocation,
} from "../../../store/features/user/userSlice";
import { Colors, Spacing } from "../../../utils";
import { QuotedText } from "../../../components/atoms/QuotedText";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import {
  getHometownDetails,
  getJobDetails,
  getSchoolDetails,
} from "../../../features/ProfileView/components/getDetails";
import { styles } from "../../../features/ProfileView/styles";
import { selectAllPrompts } from "../../../store/features/prompts/promptsSlice";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import { AppButton } from "../../../components/atoms/AppButton";
import { ProfilePageDetails } from "../../../features/ProfileView/components/ProfilePageDetails";
import { heightsByInch } from "../../../utils/constants/heights";
import { useGetShareLink } from "../../../hooks/useGetShareLink";
import { getStringData, storeStringData } from "../../../utils/storage";

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

export const UserProfileView = () => {
  const userTags = useAppSelector(selectUserTags);

  const userPrompts = useAppSelector(selectUserPrompts);
  const userProfile = useAppSelector(selectUserProfile);
  const userLocation = useAppSelector(selectUserLocation);
  const promptDisplayOrder = useAppSelector(selectUserPromptsOrder);
  const allPrompts = useAppSelector(selectAllPrompts);
  const visualsRedux = useAppSelector(selectUserVisuals);

  const visuals = useMemo(() => {
    const images = Object.values(visualsRedux);
    return images;
  }, [visualsRedux]);

  const [shareLinkToSocialMedia] = useGetShareLink();

  const [merged, setMerged] = useState<any>([]);

  useOnScreenView({ screenName: analyticScreenNames.profileView, screenType: screenClass.profile });

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

  useEffect(() => {
    const mergeData = () => {
      const promptIds = (promptDisplayOrder || []).filter((id) => id !== undefined);
      if (promptIds.length > 0 || (visuals && visuals.length > 0)) {
        const maxLength = Math.max(promptIds.length, visuals.length);
        setMerged([]);
        for (let i = 0; i < maxLength; i++) {
          if (visuals[i]) {
            setMerged((prev: any) => [...prev, { type: "image", image: visuals[i] }]);
          }
          const id = promptIds[i];
          if (id) {
            if (userPrompts[id]?.answer) {
              setMerged((prev: any) => [...prev, { type: "prompt", prompt: userPrompts[id] }]);
            }
          }
        }
      } else {
        setMerged([]);
        for (let i = 0; i < promptIds.length; i++) {
          const id = promptIds[i];
          if (userPrompts[id]?.answer !== "") {
            setMerged((prev: any) => [...prev, { type: "prompt", prompt: userPrompts[id] }]);
          }
        }
      }
    };
    mergeData();
  }, [visuals, promptDisplayOrder, userPrompts]);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      resizeMode="cover"
      source={{
        uri: visuals ? visuals[0]?.videoOrPhoto : "../../assets/splash.png",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.whiteArc}>
          <View style={styles.descriptionContainer}>
            <View style={styles.section}>
              <Text style={styles.name}>{userProfile?.displayName}</Text>
              {userProfile?.birthday && (
                <Text style={styles.descriptionText}>
                  {moment().diff(userProfile?.birthday, "years")} years old
                </Text>
              )}
              {userProfile?.height && (
                <Text style={styles.descriptionText}>
                  {heightsByInch[userProfile?.height]?.label}
                </Text>
              )}
              {userLocation && (
                <Text style={styles.descriptionText}>
                  {userLocation?.city || userLocation?.stateProvince}
                </Text>
              )}

              {getHometownDetails(userTags)}
              {getJobDetails(userTags)}
              {getSchoolDetails(userTags)}
              <ProfilePageDetails userTags={userTags} />
            </View>
            {/* alternate prompts and images */}
            <View style={styles.content}>
              {merged.map((item: any, index: any) => {
                if (item?.type === "prompt") {
                  return (
                    <View
                      key={index}
                      style={{
                        padding: Spacing.SCALE_20,
                      }}
                    >
                      <QuotedText
                        title={allPrompts[item?.prompt?.promptId]?.prompt}
                        text={item?.prompt?.answer}
                      />
                    </View>
                  );
                }
                return (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                    }}
                  >
                    <Image
                      source={{
                        uri: item?.image?.videoOrPhoto,
                      }}
                      style={{
                        width: "100%",
                        height: 300,
                        resizeMode: "cover",
                        borderRadius: 20,
                      }}
                    />
                  </View>
                );
              })}
            </View>
            <View
              style={{
                paddingHorizontal: 40,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          backgroundColor: "transparent",
          padding: 20,
        }}
      >
        <AppButton colorScheme="coolGray" onPress={openModal}>
          Share Profile Link
        </AppButton>
        <ShareModal visible={modalVisible} onClose={closeModal} />
      </View>
    </ImageBackground>
  );
};
