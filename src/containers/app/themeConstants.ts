import { FONT_FAMILY } from "../../utils/typography/fonts";

export const fonts = {
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

export const colors = {
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
  orange: {
    50: "#FFE7DF",
    100: "#FFD6C9",
    200: "#FFC5B1",
    300: "#FFB69C",
    400: "#FFA88A",
    500: "#FF926F",
    600: "#FF7648",
    700: "#FF6A38",
    800: "#FF5B24",
    900: "#FF4E13",
  },
};

export const extendedTheme = {
  colors,
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
        fontFamily: FONT_FAMILY.Capriola_400Regular,
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
          fontFamily: FONT_FAMILY.Capriola_400Regular,
        },
      },
    },
  },
};
