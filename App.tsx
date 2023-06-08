import "react-native-gesture-handler";
import React, { useEffect, useCallback } from "react";
import { View, Alert } from "react-native";
import { NativeBaseProvider, extendTheme } from "native-base";
import Navigator from "./src/navigation/Navigator";
import { useFonts } from "expo-font";
import * as splashScreen from "expo-splash-screen";
import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import {
  RobotoSerif_100Thin_Italic,
  RobotoSerif_200ExtraLight_Italic,
  RobotoSerif_300Light_Italic,
  RobotoSerif_400Regular_Italic,
  RobotoSerif_500Medium_Italic,
  RobotoSerif_600SemiBold_Italic,
  RobotoSerif_700Bold_Italic,
  RobotoSerif_800ExtraBold_Italic,
  RobotoSerif_900Black_Italic,
} from "@expo-google-fonts/roboto-serif";
import {
  RobotoSlab_100Thin,
  RobotoSlab_200ExtraLight,
  RobotoSlab_300Light,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_600SemiBold,
  RobotoSlab_700Bold,
  RobotoSlab_800ExtraBold,
  RobotoSlab_900Black,
} from "@expo-google-fonts/roboto-slab";
import { Tienne_400Regular, Tienne_700Bold, Tienne_900Black } from "@expo-google-fonts/tienne";
import { Capriola_400Regular } from "@expo-google-fonts/capriola";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider } from "react-native-paper";
import { client } from "./src/services/api/client";
import { persistor, store } from "./src/store";
import Navigator from "./src/navigation";

const fonts = {
  Poppins: {
    100: {
      normal: "Poppins_100Thin",
      italic: "Poppins_100Thin_Italic",
    },
    200: {
      normal: "Poppins_200ExtraLight",
      italic: "Poppins_200ExtraLight_Italic",
    },
    300: {
      normal: "Poppins_300Light",
      italic: "Poppins_300Light_Italic",
    },
    400: {
      normal: "Poppins_400Regular",
      italic: "Poppins_400Regular_Italic",
    },
    500: {
      normal: "Poppins_500Medium",
      italic: "Poppins_500Medium_Italic",
    },
    600: {
      normal: "Poppins_600SemiBold",
      italic: "Poppins_600SemiBold_Italic",
    },
    700: {
      normal: "Poppins_700Bold",
      italic: "Poppins_700Bold_Italic",
    },
    800: {
      normal: "Poppins_800ExtraBold",
      italic: "Poppins_800ExtraBold_Italic",
    },
    900: {
      normal: "Poppins_900Black",
      italic: "Poppins_900Black_Italic",
    },
  },
  RobotoSerif: {
    100: {
      normal: "RobotoSlab_100Thin",
      italic: "RobotoSerif_100Thin_Italic",
    },
    200: {
      normal: "RobotoSlab_200ExtraLight",
      italic: "RobotoSerif_200ExtraLight_Italic",
    },
    300: {
      normal: "RobotoSlab_300Light",
      italic: "RobotoSerif_300Light_Italic",
    },
    400: {
      normal: "RobotoSlab_400Regular",
      italic: "RobotoSerif_400Regular_Italic",
    },
    500: {
      normal: "RobotoSlab_500Medium",
      italic: "RobotoSerif_500Medium_Italic",
    },
    600: {
      normal: "RobotoSlab_600SemiBold",
      italic: "RobotoSerif_600SemiBold_Italic",
    },
    700: {
      normal: "RobotoSlab_700Bold",
      italic: "RobotoSerif_700Bold_Italic",
    },
    800: {
      normal: "RobotoSlab_800ExtraBold",
      italic: "RobotoSerif_800ExtraBold_Italic",
    },
    900: {
      normal: "RobotoSlab_900Black",
      italic: "RobotoSerif_900Black_Italic",
    },
  },
};

const customTheme = extendTheme({
  colors: {
    // Add new color
    primary: {
      50: "#d4d4d4",
      100: "#e5e5e5",
      200: "#fafafa",
      300: "#fafafa",
      400: "#ffffff",
      500: "#fafafa",
      600: "#fafafa",
      700: "#e5e5e5",
      800: "#d4d4d4",
      900: "#a3a3a3",
    },
  },
  fontConfig: {
    Poppins: fonts.Poppins,
    RobotoSerif: fonts.RobotoSerif,
  },
  fonts: {
    heading: "RobotoSerif",
    body: "Poppins",
    //  mono: "RobotoSerif",
  },
  components: {
    Heading: {
      defaultProps: {
        color: "white",
        fontFamily: "Capriola_400Regular",
        
      },
    },
    Button: {
      baseStyle: {
        rounded: "full",
        width: "100%",
      },
      defaultProps: {
        colorScheme: "primary",
        _text: {
          color: "light.700",
          fontFamily: "Capriola_400Regular",
        },
      },
    },
  },
});

function App() {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
    RobotoSlab_100Thin,
    RobotoSlab_200ExtraLight,
    RobotoSlab_300Light,
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
    RobotoSlab_700Bold,
    RobotoSlab_800ExtraBold,
    RobotoSlab_900Black,
    RobotoSerif_100Thin_Italic,
    RobotoSerif_200ExtraLight_Italic,
    RobotoSerif_300Light_Italic,
    RobotoSerif_400Regular_Italic,
    RobotoSerif_500Medium_Italic,
    RobotoSerif_600SemiBold_Italic,
    RobotoSerif_700Bold_Italic,
    RobotoSerif_800ExtraBold_Italic,
    RobotoSerif_900Black_Italic,
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
    <NativeBaseProvider theme={customTheme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <PaperProvider>
              <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <Navigator />
              </View>
            </PaperProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </NativeBaseProvider>
  );
};

export default App;
