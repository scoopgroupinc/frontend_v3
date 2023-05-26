import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { GradientLayout } from "src/components/layout/GradientLayout";
import { onScreenView } from "src/analytics";
import { screenClass, screenNames } from "src/analytics/constants";
import { styles } from "./styles";

interface INoMatches {
  outOfMatches?: boolean;
  noMatchToday?: boolean;
}

const ComeBackTomorrow = ({ outOfMatches, noMatchToday }: INoMatches) => {
  useEffect(() => {
    onScreenView({
      screenName: screenNames.noMore,
      screenType: screenClass.matches,
    });
  }, []);
  return (
    <GradientLayout>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          style={styles.noMatchLogo}
          source={require("src/assets/images/scoop-logo.png")}
        />
        <View style={styles.textWrapper}>
          {noMatchToday && (
            <Text style={styles.noMatchText}>
              We believe in quality over quantity! Come back tomorrow for more
              potential matches.
            </Text>
          )}
          {outOfMatches && (
            <Text style={styles.noMatchText}>
              We're out of potential matches. Thank you for your patience as we
              find you more matches.
            </Text>
          )}
        </View>
      </View>
    </GradientLayout>
  );
};

export default ComeBackTomorrow;
