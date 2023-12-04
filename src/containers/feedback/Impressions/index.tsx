import React, { useEffect, useState } from "react";
import { FlatList, SectionList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import SearchFilter from "../../../components/templates/SearchFilter";
import ButtonPill from "../../../components/atoms/ButtonPill";
import { IMPRESSIONS_FORMATTED } from "../../../utils/constants/impressions";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { screenName } from "../../../utils/constants";
import TagScreenHeader from "../../../components/molecule/TagScreenHeader";
import { useSegment } from "../../../analytics";
import { analyticScreenNames, eventNames, screenClass } from "../../../analytics/constants";

const FeedbackImpressions = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const MAX_SELECTION = 3;

  const analytics = useSegment();

  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.profileFeedbackImpressions,
      screenType: screenClass.feedback,
    });
  }, []);

  const handleButtonSelection = (buttonId: string) => {
    if (selectedButtons.includes(buttonId)) {
      setSelectedButtons((prevSelected) => prevSelected.filter((id) => id !== buttonId));
      analytics.trackEvent({
        eventName: eventNames.selectFirstImpressions,
        params: { deselected: buttonId },
      })
    } else {
      setSelectedButtons((prevSelected) => [...prevSelected, buttonId]);
      analytics.trackEvent({
        eventName: eventNames.selectFirstImpressions,
        params: { selected: buttonId },
      })
    }
  };

  const isButtonDisabled = (buttonId: string) =>
    selectedButtons.length >= MAX_SELECTION && !selectedButtons.includes(buttonId);

  const renderSearchWord = ({ item }: any) => {
    // when no input, show all
    if (searchPhrase === "") {
      return (
        <ButtonPill
          title={item}
          onPress={() => handleButtonSelection(item)}
          isButtonDisabled={isButtonDisabled(item)}
          selected={selectedButtons.includes(item)}
        />
      );
    }

    // filter of the name
    if (item.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return (
        <ButtonPill
          title={item}
          onPress={() => handleButtonSelection(item)}
          isButtonDisabled={isButtonDisabled(item)}
          selected={selectedButtons.includes(item)}
        />
      );
    }

    return null;
  };

  const renderSection = ({ item }) => (
    <FlatList
      data={item.list}
      numColumns={100}
      columnWrapperStyle={{
        flexWrap: "wrap",
      }}
      horizontal={false}
      renderItem={renderSearchWord}
      keyExtractor={(item) => item}
      extraData={selectedButtons}
    />
  );

  return (
    <GradientLayout>
      <TagScreenHeader title="First Impressions" close={() => navigation.goBack()} />
      <Text style={styles.cancel}> What does this profile say about me? Select 3</Text>
      <SearchFilter
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={IMPRESSIONS_FORMATTED}
        keyExtractor={(item, index) => item.title + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={renderSection}
      />
      <AppButton
        isDisabled={selectedButtons.length !== 3}
        onPress={() => {
          analytics.trackEvent({
            eventName: eventNames. submitFirstImpressionsButton,
            params: { personsalities: setSelectedButtons },
          })
          navigation.navigate(screenName.GO_DEEPER, {
            selectedButtons,
          });
        }}
      >
        {selectedButtons.length !== 0
          ? `Continue ${selectedButtons.length} / ${MAX_SELECTION}`
          : "Select 3 impressions"}
      </AppButton>
    </GradientLayout>
  );
};

export default FeedbackImpressions;
