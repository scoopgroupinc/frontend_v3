import React, { useEffect, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { NativeBaseProvider, extendTheme } from "native-base";
import * as splashScreen from "expo-splash-screen";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider } from "react-native-paper";
import { createClient, AnalyticsProvider } from "@segment/analytics-react-native";
import { AdvertisingIdPlugin } from "@segment/analytics-react-native-plugin-advertising-id";
import { FirebasePlugin } from "@segment/analytics-react-native-plugin-firebase";
import { MixpanelPlugin } from "@segment/analytics-react-native-plugin-mixpanel";
import * as Linking from "expo-linking";
import { client } from "./src/services/api/client";
import { persistor, store } from "./src/store";
import Navigator from "./src/navigation";
import { useCustomTheme } from "./src/containers/app/hooks/useCustomTheme";
import { extendedTheme } from "./src/containers/app/themeConstants";
import { SEGMENT_WRITE_KEY } from "./src/utils/constants/apis";

const segmentClient = createClient({
  writeKey: "QKJ82u7RQc0XBu1VM1gvcmAq4grRICtU",
  collectDeviceId: true,
  debug: true,
  flushAt: 20,
  flushInterval: 30,
  maxBatchSize: 1000,
  trackAppLifecycleEvents: true,
  trackDeepLinks: true,
  autoAddSegmentDestination: true,
});

segmentClient.add({ plugin: new AdvertisingIdPlugin() });
segmentClient.add({ plugin: new FirebasePlugin() });
segmentClient.add({ plugin: new MixpanelPlugin() });

const App = () => {
  const [fontsLoaded] = useCustomTheme();
  const customTheme = extendTheme(extendedTheme);

  useEffect(() => {
    const prepare = async () => {
      await splashScreen.preventAutoHideAsync();
    };
    prepare();
  }, []);

  // useEffect(() => {
  //   // Function to handle the deep link
  //   const handleDeepLink = (event) => {
  //     // Use the Segment client to track the deep link
  //     segmentClient.track("Deep Link Opened", {
  //       url: event.url,
  //     });
  //   };

  //   // Listen for any incoming links
  //   Linking.addEventListener("url", handleDeepLink);

  //   // Check if the app was opened by a deep link
  //   Linking.getInitialURL().then((url) => {
  //     if (url) {
  //       segmentClient.track("Deep Link Opened", {
  //         url,
  //       });
  //     }
  //   });

  //   // Clean up
  //   return () => {
  //     Linking.removeEventListener("url", handleDeepLink);
  //   };
  // }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await splashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={customTheme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AnalyticsProvider client={segmentClient}>
            <PersistGate persistor={persistor} loading={null}>
              <PaperProvider>
                <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
                  <Navigator />
                </GestureHandlerRootView>
              </PaperProvider>
            </PersistGate>
          </AnalyticsProvider>
        </Provider>
      </ApolloProvider>
    </NativeBaseProvider>
  );
};

export default App;
