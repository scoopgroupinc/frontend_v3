import React from "react";
import { View, Text, Image } from "react-native";
import { GradientLayout } from "../../../components/layouts/GradientLayout";
import { styles } from "./styles";
import { useOnScreenView } from "../../../analytics/hooks/useOnScreenView";
import { analyticScreenNames, screenClass } from "../../../analytics/constants";

export const ComeBackTomorrow = ({ outOfMatches, noMatchToday }: any) => (
  <GradientLayout>
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image style={styles.noMatchLogo} source={require("../../../assets/images/scoop-logo.png")} />
      <View style={styles.textWrapper}>
        {noMatchToday && (
          <Text style={styles.noMatchText}>
            We believe in quality over quantity! Come back tomorrow for more potential matches.
          </Text>
        )}
        {outOfMatches && (
          <Text style={styles.noMatchText}>
            We're out of potential matches. Thank you for your patience as we find you more matches.
          </Text>
        )}
      </View>
    </View>
  </GradientLayout>
);

useOnScreenView({
  screenName: analyticScreenNames.noMore,
  screenType: screenClass.matches
});
