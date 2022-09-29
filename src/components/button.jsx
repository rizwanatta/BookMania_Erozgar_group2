import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

function Button({ title, onPress, disabled, style }) {
  return (
    <TouchableOpacity
      style={
        disabled === true ? styles.disabledContainer : style || styles.container
      }
      disabled={disabled}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

export { Button };

const buttonBaseStyles = {
  width: "80%",
  padding: 10,
  borderRadius: 10,
  alignSelf: "center",
  justifyContent: "center",
  alignItems: "center",
};

const styles = StyleSheet.create({
  container: {
    ...buttonBaseStyles,
    backgroundColor: "rgba(0,246,246,0.5)",
  },

  disabledContainer: {
    ...buttonBaseStyles,
    backgroundColor: "grey",
  },
});
