import React, { useEffect, useState } from "react";
import { View, Text, Platform, Alert } from "react-native";
import { GradientLayout } from "src/components/layout/GradientLayout";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { ProgressBar } from "react-native-paper";
import { NavigationScreenType } from "src/types/globals";
import { useMutation } from "@apollo/client";
import { SubmissionBtn } from "src/components/atoms/SubmissionButton";
import { ONBOARD_NAVIGATION, STORAGE } from "src/navigations/utils/CONSTANTS";
import { SAVE_USER_LOCATION } from "src/graphql/onboarding/mutations";
import { useAppSelector } from "src/store/hooks";
import { selectUser } from "src/store/features/UserProfileSlice";
import { Colors } from "src/styles";
import { logEvent, onScreenView } from "src/analytics";
import { eventNames, screenClass, analyticScreenNames } from "src/analytics/constants";
import { completeScreen, COMPLETE_SCREEN } from "../../onboardHandler/utils";
import { styles } from "./styles";

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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const screenProgress = COMPLETE_SCREEN.find(
    (item) => item.name === ONBOARD_NAVIGATION.LOCATION
  )?.progress;

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
      completeScreen(ONBOARD_NAVIGATION.LOCATION);
      navigation.navigate(ONBOARD_NAVIGATION.NOTIFICATIONS);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
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

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
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

  const dontAllow = () => {
    Alert.alert("Sorry", "You need to allow location to use Scoop", [
      {
        text: "Don't Allow",
        style: "cancel",
      },
      { text: "Allow", onPress: allowLocation },
    ]);
  };

  return (
    <GradientLayout>
      <View style={styles.container}>
        <ProgressBar progress={screenProgress} color="#0E0E2C" />
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.textHeader]}>Where do you live?</Text>
          <Text style={[styles.text, styles.textMinor]}>
            The best way to get to know someone is to meet them in person.
          </Text>
        </View>
        <SubmissionBtn
          title="Add my location"
          style={{
            backgroundColor: location === null ? "transparent" : Colors.WHITE,
          }}
          disabled={location === null}
          spinner={!!loading}
          onPress={() => requestLocation()}
        />
      </View>
    </GradientLayout>
  );
};
