/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";

import { styles } from "./styles";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";
import SocialLogins from "../../../components/molecule/SocialLogins";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { useSegment } from "../../../analytics";

const Launch = () => {
  const analytics = useSegment();
  useEffect(() => {
    analytics.screenEvent({
      screenName: analyticScreenNames.welcome,
      screenType: screenClass.auth,
    });
  }, []);
  return (
    <GradientLayout>
      <View style={[styles.container]}>
        <Image
          // eslint-disable-next-line global-require
          source={require("../../../assets/images/facets-logo.png")}
          style={{ height: 80, width: 80 }}
        />
        <Text style={styles.title}>Facets</Text>
        <Text style={styles.blur}>Date Smarter. Live Fuller.</Text>
      </View>
      <SocialLogins />
    </GradientLayout>
  );
};

export default Launch;
