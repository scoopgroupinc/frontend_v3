import { StyleSheet } from "react-native";
import { Spacing } from "../../../../utils";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    paddingLeft: Spacing.SCALE_30,
    paddingRight: Spacing.SCALE_30,
    marginBottom: Spacing.SCALE_20,
  },
  switch: {
    flex: 1,
    marginLeft: Spacing.SCALE_30,
    marginRight: Spacing.SCALE_30,
    marginTop: Spacing.SCALE_40,
  },
});
