import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

export { Loading };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 30,
    position: "absolute",
  },
});
