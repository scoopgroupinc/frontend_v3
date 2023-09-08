/* eslint-disable global-require */
import React from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GradientLayout } from "../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { AppButton } from "../../components/atoms/AppButton";

const ErrorScreen = ({ route }: any) => {
  const { error } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <GradientLayout>
      <View style={styles.body}>
        <Image
          source={require("../../assets/images/scoop-logo.png")}
          style={{ height: 80, width: 80 }}
        />
        <View style={styles.requestBody}>
          <Text style={styles.title}>
            {error.includes("UserLink is inactive") ? "Oops Sorry!" : "Something went wrong"}
          </Text>
          <Image
            source={require("../../assets/images/back-tears.png")}
            style={{ height: 80, width: 80, borderRadius: 100 }}
          />
          <Text style={styles.title}>
            {error.includes("UserLink is inactive")
              ? "This user link has been deactivated"
              : `${error.message}`}
          </Text>
        </View>
      </View>
      <View style={styles.buttonsBody}>
        <AppButton style={styles.btn} onPress={() => navigation.goBack()}>
          Go to home
        </AppButton>
      </View>
    </GradientLayout>
  );
};

export default ErrorScreen;
