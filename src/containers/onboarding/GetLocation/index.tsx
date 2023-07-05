import React, { useEffect, useState } from "react";
import { View, Text, Platform, Alert } from "react-native";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { ProgressBar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { SAVE_USER_LOCATION } from "../../../services/graphql/onboarding/mutations";
import { useAppSelector } from "../../../store/hooks";
import { selectUser } from "../../../store/features/user/userSlice";
import { logEvent, onScreenView } from "../../../analytics";
import { eventNames, screenClass, analyticScreenNames } from "../../../analytics/constants";
import { styles } from "./styles";
import { AppButton } from "../../../components/atoms/AppButton";
import { NavigationScreenType } from "../../../types/globals";
import { screenName } from "../../../utils/constants";

const locationObject = {
  latitude: 0,
  longitude: 0,
  accuracy: 0,
  altitude: 0,
  altitudeAccuracy: 0,
  heading: 0,
  speed: 0,
};

export const GetLocationsScreen = ({ navigation }: NavigationScreenType) => {
  const reduxUser = useAppSelector(selectUser);
  const { userId } = reduxUser;

  const [location, setLocation] = useState<any>(null);
  const [, setErrorMsg] = useState<string | null>(null);

  const [saveUserLocation, { loading }] = useMutation(SAVE_USER_LOCATION);
  const saveUserLocationMutation = async () => {
    try {
      const data = {
        userId,
        latitude: location?.latitude.toString(),
        longitude: location?.longitude.toString(),
      };

      await saveUserLocation({
        variables: {
          CreateLocationInput: data,
        },
      });
      navigation.navigate(screenName.NOTIFICATIONS);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const currLocation = await Location.getCurrentPositionAsync({});
      setLocation(currLocation.coords);
    })();
    onScreenView({
      screenName: analyticScreenNames.onBoardLocation,
      screenType: screenClass.onBoarding,
    });
  }, []);

  const allowLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 3600000,
        },
        (loc) => {
          logEvent({
            eventName: eventNames.submitOnBoardLocationButton,
            params: { location: loc, screenClass: screenClass.onBoarding },
          });
        }
      );
      saveUserLocationMutation();
    }
  };

  const dontAllow = () => {
    Alert.alert("Sorry", "You need to allow location to use Scoop", [
      {
        text: "Don't Allow",
        style: "cancel",
      },
      { text: "Allow", onPress: allowLocation },
    ]);
  };

  const requestLocation = () => {
    if (location === null) {
      Alert.alert(
        "Scoop would like to use your location",
        `Turn on Location Services to allow "Scoop" to determine your location`,
        [
          {
            text: "Don't Allow",
            onPress: dontAllow,
            style: "cancel",
          },
          { text: "Allow", onPress: allowLocation },
        ]
      );
    } else {
      saveUserLocationMutation();
      navigation.navigate("SendNotification");
    }
  };

  // TODO: set progress amount
  return (
    <GradientLayout>
      <View style={styles.container}>
        <ProgressBar progress={0.8} color="#0E0E2C" />
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textHeader]}>Where do you live?</Text>
          <Text style={[styles.text, styles.textMinor]}>
            The best way to get to know someone is to meet them in person.
          </Text>
        </View>
        <AppButton
          isDisabled={location === null}
          isLoading={!!loading}
          onPress={() => requestLocation()}
        >
          Add my location
        </AppButton>
      </View>
    </GradientLayout>
  );
};
