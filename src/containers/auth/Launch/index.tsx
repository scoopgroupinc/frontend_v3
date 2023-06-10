import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { VStack } from "native-base";
import * as AuthSession from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { AppButton } from "../../../components/atoms/AppButton";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { screenName } from "../../../utils/constants";

WebBrowser.maybeCompleteAuthSession();

const Launch = () => {
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "136276392801515",
  });

  if (request) {
    console.log(
      "You need to add this url to your authorized redirect urls on your Facebook app: " +
        request.redirectUri
    );
  }

  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
  };

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onSignUpPress = () => {
    navigation.navigate(screenName.REGISTER);
  };
  const onSignInPress = () => {
    navigation.navigate(screenName.LOGIN);
  };

  return (
    <GradientLayout>
      <View style={[styles.container]}>
        <Image
          source={require("../../../assets/images/scoop-logo.png")}
          style={{ height: 250, width: 250 }}
        />
        <Text style={styles.title}>SCOOP UPDATE</Text>
        <Text style={styles.blur}>Date Smarter. Live Fuller.</Text>
      </View>
      <VStack space={4} style={[styles.btnContainer]}>
        {user ? (
          <VStack style={{ alignItems: "center" }}>
            <Image
              source={{ uri: user.picture.data.url }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {user.name}
            </Text>
            <Text>ID: {user.id}</Text>
            <AppButton onPress={() => {}}>Logout</AppButton>
          </VStack>
        ) : (
          <AppButton isDisabled={!request} onPress={handlePressAsync} colorScheme="blue">
            Sign in with Facebook
          </AppButton>
        )}
        <AppButton onPress={onSignUpPress}>Create Account</AppButton>
        <AppButton onPress={onSignInPress} variant="ghost">
          Sign In
        </AppButton>
      </VStack>
    </GradientLayout>
  );
};

export default Launch;
