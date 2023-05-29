import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../../utils";
import { styles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export const ScrollableGradientLayout = ({ children, align }: any) => {
  const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];
  return (
    <LinearGradient
      style={[styles.container, align && styles.alignCenter]}
      colors={gradient}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
