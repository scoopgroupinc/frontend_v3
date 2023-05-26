import React, { useEffect, useCallback } from "react";
import "react-native-gesture-handler";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./src/navigation";
import { useFonts } from "expo-font";
import * as splashScreen from "expo-splash-screen";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Tienne_400Regular, Tienne_700Bold } from "@expo-google-fonts/tienne";
import { Capriola_400Regular } from "@expo-google-fonts/capriola";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/services/api/client";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Tienne_400Regular,
    Tienne_700Bold,
    Capriola_400Regular,
  });

  useEffect(() => {
    /**
     * @returns a Promise that resolves & prevents the default auto hide behavior of the splash screen so that we only allow / show the launch screen once all the fonts have been loaded
     */

    const prepare = async () => {
      await splashScreen.preventAutoHideAsync();
    };

    prepare();
  }, []);

  /**
   * @returns - a Promise that resolves & hides the splash screen from view to display the launch screen once all the fonts have been loaded.
   *
   * @summary - the useCallback hook here is used to updated the memoized function incase the fontsLoaded state is changed, this will be changed once the fonts are loaded and the layout effect on the view container in the component will invoke this function resulting in a hiding the splash screen from view
   */

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await splashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  /**
   * @summary If the fonts have not been loaded then the component will not be displayed once the fonts are loaded a rerender will trigger and the layout effect on the view container will hide the splash screen from view, this is done so that the splash screen is only hidden when necessary
   */

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <Navigator />
            </View>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
