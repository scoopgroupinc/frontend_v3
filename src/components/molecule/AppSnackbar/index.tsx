import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { Colors } from "../../../utils";

export const AppSnackbar = ({ visible, message }: any) => (
    <View style={styles.container}>
      <Snackbar
        style={{ backgroundColor: Colors.DARK_GRAY }}
        visible={visible}
        duration={message === "Invalid credentials" ? 3000 : 5000}
        onDismiss={() => {
          // Do something
        }}
      >
        {message}
      </Snackbar>
    </View>
  )

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
