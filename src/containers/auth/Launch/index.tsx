import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppButton } from "../../../components/atoms/AppButton";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import screenName from "../../../utils/constants/screenName";
import { Colors } from "../../../utils";

function Launch() {
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
      <View style={[styles.btnContainer]}>
        <AppButton onPress={onSignUpPress} title="Create Account" bgColor={Colors.ICE_WHITE} />

        <TouchableOpacity onPress={onSignInPress}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </GradientLayout>
  );
}

export default Launch;
