import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import TagScreenHeader from "../../../../components/molecule/TagScreenHeader";
import { GradientLayout } from "../../../../components/layouts/GradientLayout";
import {
  selectUserLocation,
  setUserLocationVisibility,
} from "../../../../store/features/user/userSlice";

export const AddressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const userLocation = useAppSelector(selectUserLocation);
  const dispatch = useAppDispatch();

  const placesRef = useRef<any>(null);

  const EmptyListComponent = () => (
    <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#fff" }}>No results found</Text>
    </View>
  );

  useEffect(() => {
    placesRef.current?.setAddressText(userLocation?.addressLine1 || "");
  }, []);

  return (
    <GradientLayout>
      <TagScreenHeader close={() => navigation.goBack()} title={"Address"} />
      <GooglePlacesAutocomplete
        ref={placesRef}
        placeholder="Search Address"
        fetchDetails={true}
        onPress={(data, details = null) => {
          const { lat, lng } = details?.geometry?.location;
          const { city, state, country }: any = details?.address_components.reduce(
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
          dispatch(
            setUserLocationVisibility({
              latitude: lat?.toString(),
              longitude: lng?.toString(),
              addressLine1: details?.formatted_address,
              city,
              stateProvince: state,
              country,
            })
          );
        }}
        onFail={(error) => console.error(error)}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
        listEmptyComponent={<EmptyListComponent />}
      />
    </GradientLayout>
  );
};
