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
<<<<<<< HEAD:src/containers/home/UserProfile/City/index.tsx
      <TagScreenHeader close={() => navigation.goBack()} title={"City"} />
      <GooglePlacesAutocomplete
        ref={placesRef}
        placeholder="Search City"
        fetchDetails={true}
=======
      <TagScreenHeader close={() => navigation.goBack()} title="Address" />
      <GooglePlacesAutocomplete
        ref={placesRef}
        placeholder="Search Address"
        fetchDetails
>>>>>>> 8aaf854 (EXPO_PUBLIC for env):src/containers/home/UserProfile/Address/index.tsx
        onPress={(data, details = null) => {
          console.log("results", details);

          const { lat, lng } = details?.geometry?.location;
          let city;
          const { state, country }: any = details?.address_components.reduce(
            (acc: any, curr: any) => {
              // if (curr.types.includes("locality")) {
              //   console.log("locality", curr);
              //   acc.city = curr.long_name;
              // }
              if (curr.types.includes("administrative_area_level_1")) {
                acc.state = curr.long_name;
              }
              if (curr.types.includes("country")) {
                acc.country = curr.long_name;
              }
              return acc;
            }
          );

          // Look for 'locality' in address components
          const localityComponent = details?.address_components.find((component) =>
            component.types.includes("locality")
          );

          // Look for 'administrative_area_level_3' if 'locality' is not found
          if (!localityComponent) {
            const adminAreaLevel3Component = details?.address_components.find((component) =>
              component.types.includes("administrative_area_level_3")
            );

            if (adminAreaLevel3Component) {
              city = adminAreaLevel3Component.long_name;
            } else {
              // If 'locality' and 'administrative_area_level_3' are not available, look for 'administrative_area_level_2' (county)
              const countyComponent = details?.address_components.find((component) =>
                component.types.includes("administrative_area_level_2")
              );

              if (countyComponent) {
                city = countyComponent.long_name;
              } else {
                // If neither 'locality', 'administrative_area_level_3', nor 'administrative_area_level_2' is available, use the first component
                city = details?.address_components[0].long_name;
              }
            }
          } else {
            city = localityComponent.long_name;
          }

          console.log("city", city);

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
