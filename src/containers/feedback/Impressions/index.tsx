import React, { useState } from "react";
import { FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import SearchFilter from "../../../components/templates/SearchFilter";
import ButtonPill from "../../../components/atoms/ButtonPill";
import { IMPRESSIONS } from "../../../utils/constants/impressions";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { screenName } from "../../../utils/constants";

const FeedbackImpressions = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const MAX_SELECTION = 3;

  const handleButtonSelection = (buttonId: string) => {
    if (selectedButtons.includes(buttonId)) {
      setSelectedButtons((prevSelected) => prevSelected.filter((id) => id !== buttonId));
    } else {
      setSelectedButtons((prevSelected) => [...prevSelected, buttonId]);
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

  return (
    <GradientLayout>
      <SearchFilter
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {selectedButtons.length === 3 && (
        <Text style={styles.cancel}>You cant select more than 3 impressions</Text>
      )}
      <FlatList
        numColumns={4}
        columnWrapperStyle={{
          flexWrap: "wrap",
          flexDirection: "row",
        }}
        horizontal={false}
        data={Object.values(IMPRESSIONS)}
        renderItem={renderSearchWord}
        keyExtractor={(item) => item}
        extraData={selectedButtons}
      />
      <AppButton onPress={() => navigation.navigate(screenName.GO_DEEPER)}>
        {selectedButtons.length !== 0
          ? `Continue ${selectedButtons.length} / ${MAX_SELECTION}`
          : "Select 3 impressions"}
      </AppButton>
    </GradientLayout>
  );
};

export default FeedbackImpressions;
