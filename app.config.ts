import { ExpoConfig, ConfigContext } from "expo/config";

// trim for windows which leaves in trailing spaces...
const environment = (process.env.NODE_ENV || "development").trim();
const oauth = {
  production: {
    EXPO_CLIENT_ID: process.env.EXPO_CLIENT_ID,
    EXPO_CLIENT_SECRET: process.env.EXPO_CLIENT_SECRET,
    ANDROID_GOOGLE_GUID: process.env.ANDROID_GOOGLE_GUID,
    IOS_GOOGLE_GUID: process.env.IOS_GOOGLE_GUID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },
  development: {
    EXPO_CLIENT_ID: process.env.DEV_EXPO_CLIENT_ID,
    EXPO_CLIENT_SECRET: process.env.DEV_EXPO_CLIENT_SECRET,
    ANDROID_GOOGLE_GUID: process.env.DEV_ANDROID_GOOGLE_GUID,
    IOS_GOOGLE_GUID: process.env.DEV_IOS_GOOGLE_GUID,
    FACEBOOK_APP_ID: process.env.DEV_FACEBOOK_APP_ID,
  },
  local: {
    EXPO_CLIENT_ID: process.env.LOCAL_EXPO_CLIENT_ID,
    EXPO_CLIENT_SECRET: process.env.LOCAL_EXPO_CLIENT_SECRET,
    ANDROID_GOOGLE_GUID: process.env.LOCAL_ANDROID_GOOGLE_GUID,
    IOS_GOOGLE_GUID: process.env.LOCAL_IOS_GOOGLE_GUID,
    FACEBOOK_APP_ID: process.env.LOCAL_FACEBOOK_APP_ID,
  },
};

const config = {
  name: "scoop",
  slug: "scoop",
  version: "1.0.0",
  orientation: "portrait",
  icon: "src/assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "src/assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  jsEngine: "hermes",
  ios: {
    jsEngine: "jsc",
    supportsTablet: true,
    buildNumber: "2.1.6",
    version: "1.0.0",
    bundleIdentifier: "com.facets.one",
    icon: "src/assets/icon.png",
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
    adaptiveIcon: {
      foregroundImage: "src/assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "src/assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "c7bc250b-d451-49fd-b042-5a9fae365906",
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
  ],
};

const environments = {
  local: {
    ...config,
    extra: {
      ...config.extra,
      ENV: environment,
      CLIENT_URL: process.env.LOCAL_CLIENT_URL,
      CHATSERVICE_BASE_URL: process.env.LOCAL_CHATSERVICE_BASE_URL,
      FILE_URL: process.env.LOCAL_FILE_URL,
      NOTIFICATION_URL: process.env.LOCAL_NOTIFICATION_URL,
      ...oauth.local,
    },
  },
  development: {
    ...config,
    extra: {
      ...config.extra,
      ENV: environment,
      CLIENT_URL: process.env.DEV_CLIENT_URL,
      CHATSERVICE_BASE_URL: process.env.DEV_CHATSERVICE_BASE_URL,
      FILE_URL: process.env.DEV_FILE_URL,
      NOTIFICATION_URL: process.env.DEV_NOTIFICATION_URL,
      ...oauth.development,
    },
  },
  production: {
    ...config,
    extra: {
      ...config.extra,
      ENV: environment,
      CLIENT_URL: process.env.CLIENT_URL,
      CHATSERVICE_BASE_URL: process.env.CHATSERVICE_BASE_URL,
      FILE_URL: process.env.FILE_URL,
      NOTIFICATION_URL: process.env.NOTIFICATION_URL,
      ...oauth.production,
    },
  },
};

export default ({ config }: ConfigContext): ExpoConfig => environments[environment];
