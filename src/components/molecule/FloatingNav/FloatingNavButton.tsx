import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { Colors } from "../../../utils";
import { styles } from "./styles";

const gradient = [Colors.RUST, Colors.RED, Colors.TEAL];

interface FloatingNavButtonProps {
  icon: string;
  focused: boolean;
}

export const FloatingNavButton = ({ icon, focused }: FloatingNavButtonProps) => (
  <>
    {focused ? (
      <LinearGradient
        style={[styles.button]}
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={icon} size={25} color={Colors.WHITE} />
      </LinearGradient>
    ) : (
      <View style={styles.button}>
        <Ionicons name={icon} size={30} color={Colors.DARK_GRAY_BLUE} />
      </View>
    )}
  </>
);
