import crashlytics from "@react-native-firebase/crashlytics";

const crashLog = (text: string) => crashlytics().log(text);

const crashLogin = (user: { userId: string }) => {
  crashlytics().log("User signed in.");
  return Promise.all([crashlytics().setUserId(user?.userId), crashlytics().setAttributes(user)]);
};

export { crashLog, crashLogin };
