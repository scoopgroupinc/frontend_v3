import React, { useRef, useState } from "react";
import { View, Text, Alert } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { SAVE_USER_LOCATION } from "../../../services/graphql/onboarding/mutations";
import { useAppSelector } from "../../../store/hooks";
import { AppButton } from "../../../components/atoms/AppButton";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { styles } from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { screenName } from "../../../utils/constants";

export const GetLocationsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { user } = useAppSelector((state: any) => state.appUser);
  const userId = user?.userId;
  const [inputLocation, setInputLocation] = useState<any>();
  const [googleLocs, setGoogleLocs] = useState<any>();

  const [saveUserLocation, { loading }] = useMutation(SAVE_USER_LOCATION);

  const placesRef = useRef<any>(null);

  const EmptyListComponent = () => (
    <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#fff" }}>No results found</Text>
    </View>
  );

  const saveLocationToDb = async () => {
    const { lat, lng } = googleLocs?.geometry?.location;
    const { city, state, country }: any = googleLocs?.address_components.reduce(
      (acc: any, curr: any) => {
        if (curr.types.includes("locality")) {
          acc.city = curr.long_name;
        }
        if (curr.types.includes("administrative_area_level_1")) {
          acc.state = curr.long_name;
        }
        if (curr.types.includes("country")) {
          acc.country = curr.long_name;
        }
        return acc;
      }
    );
    const CreateLocationInput = {
      userId,
      latitude: lat.toString(),
      longitude: lng.toString(),
      addressLine1: inputLocation,
      city,
      stateProvince: state,
      country,
    };

    try {
      await saveUserLocation({
        variables: {
          CreateLocationInput,
        },
      }).then(() => {
        navigation.navigate(screenName.BIRTHDAY);
      });
    } catch (error) {
      console.log("save location error", error);
    }
  };

  return (
    <GradientLayout>
      <View style={styles.container}>
        <ProgressBar progress={0.8} color="#0E0E2C" />
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textHeader]}>Where do you live?</Text>
          <Text style={[styles.text, styles.textMinor]}>
            The best way to get to know someone is to meet them in person.
          </Text>
          <GooglePlacesAutocomplete
            textInputProps={{
              onChangeText: (text) => {
                setInputLocation(text);
              },
            }}
            ref={placesRef}
            placeholder="Search City"
            fetchDetails={true}
            onPress={(data, details = null) => {
              setGoogleLocs(details);
            }}
            onFail={(error) => console.error(error)}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
              language: "en",
            }}
            listEmptyComponent={<EmptyListComponent />}
          />
        </View>

        <AppButton isDisabled={!inputLocation} isLoading={!!loading} onPress={saveLocationToDb}>
          Add my location
        </AppButton>
      </View>
    </GradientLayout>
  );
};
