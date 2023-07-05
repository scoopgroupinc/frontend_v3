import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect } from "react";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { Alert } from "native-base";
import { SAVE_USER_LOCATION } from "../services/graphql/profile/mutations";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser, updateUser } from "../store/features/user/userSlice";
import { GET_USER_LOCATION } from "../services/graphql/profile/queries";

export const useUpdateUserLocation = () => {
  const { user } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [saveUserLocation] = useMutation(SAVE_USER_LOCATION);

  const { data: userLocationData } = useQuery(GET_USER_LOCATION, {
    variables: {
      userId: user?.userId,
    },
  });

  const saveUserLocationMutation = useCallback(
    async (cordinates: any) => {
      try {
        const data = {
          userId: user?.userId,
          latitude: cordinates?.coords?.latitude.toString(),
          longitude: cordinates?.coords?.longitude.toString(),
        };

        await saveUserLocation({
          variables: {
            CreateLocationInput: data,
          },
        });
      } catch (err) {}
    },
    [saveUserLocation, user?.userId]
  );

  const getCityFromLatLong = useCallback(
    async (cordinates: any) => {
      const geoCity = await Location.reverseGeocodeAsync({
        latitude: cordinates?.coords?.latitude,
        longitude: cordinates?.coords?.longitude,
      });

      if (geoCity && geoCity[0]) {
        const cityData = geoCity[0];
        dispatch(
          updateUser({
            value: {
              location: cityData,
            },
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        Alert("Oops, this will not work on Snack in an Android emulator. Try it on your device!");
        return;
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});

      if (userLocationData && userLocationData.getUserLocation) {
        const { latitude, longitude } = userLocationData.getUserLocation;
        if (
          latitude !== currentLocation?.coords?.latitude &&
          longitude !== currentLocation?.coords?.longitude
        ) {
          saveUserLocationMutation(currentLocation);
          getCityFromLatLong(currentLocation);
        } else {
          getCityFromLatLong(currentLocation);
        }
      }
    })();
  }, [saveUserLocationMutation, userLocationData, getCityFromLatLong]);
};
