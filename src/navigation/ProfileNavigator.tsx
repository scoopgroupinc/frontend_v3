import React, { useCallback, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import * as Device from "expo-device";
import { Alert } from "native-base";
import { useMutation, useQuery } from "@apollo/client";
import * as Location from "expo-location";
import { Platform } from "react-native";
import { UserProfileEdit } from "../containers/home/UserProfileEdit";
import { screenName } from "../utils/constants";
import { UserProfileView } from "../containers/home/UserProfileView";
import UserProfile from "../containers/home/UserProfile";
import AppNavigator from "./AppNavigator";
import Messages from "../containers/chat/Messages";
import { SAVE_USER_LOCATION } from "../services/graphql/profile/mutations";
import { selectUser } from "../store/features/user/userSlice";
import { useAppSelector } from "../store/hooks";
import { GET_USER_LOCATION } from "../services/graphql/profile/queries";

const HomeStack = createStackNavigator();

const ProfileNavigator = () => {
  const { user } = useAppSelector(selectUser);

  const { data: userLocationData } = useQuery(GET_USER_LOCATION);

  const [saveUserLocation] = useMutation(SAVE_USER_LOCATION);
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
      } catch (err) {
        // console.error(err);
      }
    },
    [saveUserLocation, user?.userId]
  );

  const getCityFromLatLong = useCallback(async (cordinates: any) => {
    const city = await Location.reverseGeocodeAsync({
      latitude: cordinates?.coords?.latitude,
      longitude: cordinates?.coords?.longitude,
    });

    if (city && city[0]) {
      const cityData = city[0];
      console.log("cityData", cityData);
    }
  }, []);

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

      console.log("userLocationData", userLocationData);

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

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenName.APP_NAVIGATOR}
    >
      <HomeStack.Screen name={screenName.APP_NAVIGATOR} component={AppNavigator} />
      <HomeStack.Screen name={screenName.USER_PROFILE} component={UserProfile} />
      <HomeStack.Screen name={screenName.USER_PROFILE_EDIT} component={UserProfileEdit} />
      <HomeStack.Screen name={screenName.USER_PROFILE_VIEW} component={UserProfileView} />
      <HomeStack.Screen
        options={{
          headerShown: false,
        }}
        name={screenName.MESSAGES}
        component={Messages}
      />
    </HomeStack.Navigator>
  );
};

export default ProfileNavigator;
