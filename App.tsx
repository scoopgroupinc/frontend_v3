import React, { useEffect, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { NativeBaseProvider, extendTheme } from "native-base";
import * as splashScreen from "expo-splash-screen";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider } from "react-native-paper";
import { client } from "./src/services/api/client";
import { persistor, store } from "./src/store";
import Navigator from "./src/navigation";
import { useCustomTheme } from "./src/containers/app/hooks/useCustomTheme";
import { extendedTheme } from "./src/containers/app/themeConstants";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

const App = () => {
  const [fontsLoaded] = useCustomTheme();

  const customTheme = extendTheme(extendedTheme);

  useEffect(() => {
    const prepare = async () => {
      await splashScreen.preventAutoHideAsync();
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await splashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === "granted") {
        console.log("Yay! I have user permission to track data");
      }
    })();
  }, []);

  return (
    <NativeBaseProvider theme={customTheme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <PaperProvider>
              <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <Navigator />
              </GestureHandlerRootView>
            </PaperProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </NativeBaseProvider>
  );
};

export default App;
