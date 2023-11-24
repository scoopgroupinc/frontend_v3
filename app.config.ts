import { ExpoConfig, ConfigContext } from "expo/config";

// trim for windows which leaves in trailing spaces...
const environment = (process.env.NODE_ENV || "development").trim();
const oauth = {
  production: {
    EXPO_CLIENT_ID: process.env.EXPO_PUBLIC_EXPO_CLIENT_ID,
    EXPO_CLIENT_SECRET: process.env.EXPO_PUBLIC_EXPO_CLIENT_SECRET,
    ANDROID_GOOGLE_GUID: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_GUID,
    IOS_GOOGLE_GUID: process.env.EXPO_PUBLIC_IOS_GOOGLE_GUID,
    FACEBOOK_APP_ID: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID,
  },
  development: {
    EXPO_CLIENT_ID: process.env.EXPO_PUBLIC_DEV_EXPO_CLIENT_ID,
    EXPO_CLIENT_SECRET: process.env.EXPO_PUBLIC_DEV_EXPO_CLIENT_SECRET,
    ANDROID_GOOGLE_GUID: process.env.EXPO_PUBLIC_DEV_ANDROID_GOOGLE_GUID,
    IOS_GOOGLE_GUID: process.env.EXPO_PUBLIC_DEV_IOS_GOOGLE_GUID,
    FACEBOOK_APP_ID: process.env.EXPO_PUBLIC_DEV_FACEBOOK_APP_ID,
  },
  local: {
    EXPO_CLIENT_ID: process.env.EXPO_PUBLIC_LOCAL_EXPO_CLIENT_ID,
    EXPO_CLIENT_SECRET: process.env.EXPO_PUBLIC_LOCAL_EXPO_CLIENT_SECRET,
    ANDROID_GOOGLE_GUID: process.env.EXPO_PUBLIC_LOCAL_ANDROID_GOOGLE_GUID,
    IOS_GOOGLE_GUID: process.env.EXPO_PUBLIC_LOCAL_IOS_GOOGLE_GUID,
    FACEBOOK_APP_ID: process.env.EXPO_PUBLIC_LOCAL_FACEBOOK_APP_ID,
  },
};

const config = {
  name: "Facets",
  slug: "facetsapps",
  version: "1.0.0",
  orientation: "portrait",
  icon: "src/assets/app-icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "src/assets/splashscreen.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  jsEngine: "hermes",
  ios: {
    jsEngine: "jsc",
    supportsTablet: true,
    buildNumber: "1.0.1",
    version: "1.0.0",
    bundleIdentifier: "com.facets.one",
    icon: "src/assets/app-icon.png",
    googleServicesFile: "src/services/firebase/GoogleService-Info.plist",
    associatedDomains: ["applinks:scoop.love"],
    infoPlist: {
      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: [
            "com.googleusercontent.apps.474530368865-87k3pk487b6tb58q49moahprr9usd3f2",
          ],
        },
      ],
    },
  },
  android: {
    package: "com.facets.one",
    versionCode: 1,
    googleServicesFile: "src/services/firebase/google-services.json",
    config: {
      googleSignIn: {
        certificateHash: "5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25",
      },
    },
    adaptiveIcon: {
      foregroundImage: "src/assets/app-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "src/assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "8e5ca08a-b63c-441a-bac9-df318db66ae0",
    },
  },
  scheme: ["scoop", `fb${oauth[environment].FACEBOOK_APP_ID}`],
  owner: "scoopgroup",
  plugins: [
    "expo-apple-authentication",
    "@react-native-google-signin/google-signin",
    "@react-native-firebase/app",
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
        },
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission: "The app accesses your photos to let you share them with your friends.",
        cameraPermission: "Allow $(PRODUCT_NAME) to open the camera",
      },
    ],
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location.",
      },
    ],
    [
      "expo-tracking-transparency",
      {
        userTrackingPermission: "Facets will deliver personalized ads to you.",
      },
    ],
  ],
};

const environments = {
  local: {
    ...config,
    extra: {
      ...config.extra,
      ENV: environment,
      CLIENT_URL: process.env.EXPO_PUBLIC_LOCAL_CLIENT_URL,
      CHATSERVICE_BASE_URL: process.env.EXPO_PUBLIC_LOCAL_CHATSERVICE_BASE_URL,
      FILE_URL: process.env.EXPO_PUBLIC_LOCAL_FILE_URL,
      NOTIFICATION_URL: process.env.EXPO_PUBLIC_LOCAL_NOTIFICATION_URL,
      ...oauth.local,
    },
  },
  development: {
    ...config,
    extra: {
      ...config.extra,
      ENV: environment,
      CLIENT_URL: process.env.EXPO_PUBLIC_DEV_CLIENT_URL,
      CHATSERVICE_BASE_URL: process.env.EXPO_PUBLIC_DEV_CHATSERVICE_BASE_URL,
      FILE_URL: process.env.EXPO_PUBLIC_DEV_FILE_URL,
      NOTIFICATION_URL: process.env.EXPO_PUBLIC_DEV_NOTIFICATION_URL,
      ...oauth.development,
    },
  },
  production: {
    ...config,
    extra: {
      ...config.extra,
      ENV: environment,
      CLIENT_URL: process.env.EXPO_PUBLIC_CLIENT_URL,
      CHATSERVICE_BASE_URL: process.env.EXPO_PUBLIC_CHATSERVICE_BASE_URL,
      FILE_URL: process.env.EXPO_PUBLIC_FILE_URL,
      NOTIFICATION_URL: process.env.EXPO_PUBLIC_NOTIFICATION_URL,
      ...oauth.production,
    },
  },
};

export default ({ config }: ConfigContext): ExpoConfig => environments[environment];
