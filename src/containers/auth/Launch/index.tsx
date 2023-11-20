/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { View, Text, Image } from "react-native";

import { styles } from "./styles";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import SocialLogins from "../../../components/molecule/SocialLogins";
import { GradientLayout } from "../../../components/layouts/GradientLayout";

const Launch = () => {
  useOnScreenView({ screenName: analyticScreenNames.welcome, screenType: screenClass.auth });
  return (
    <GradientLayout>
      <View style={[styles.container]}>
        <Image
          // eslint-disable-next-line global-require
          source={require("../../../assets/images/facets-logo.png")}
          style={{ height: 250, width: 250 }}
        />
        <Text style={styles.title}>SCOOP UPDATE</Text>
        <Text style={styles.blur}>Date Smarter. Live Fuller.</Text>
      </View>
      <SocialLogins />
    </GradientLayout>
  );
};

export default Launch;
