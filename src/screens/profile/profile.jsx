import React from "react";
import { View, Alert } from "react-native";
import { Button } from "../../components/button";
import { removeUserSession } from "../../services/sessionHelper";

function Profile({ navigation }) {
  return (
    <View style={{ marginTop: 20, flex: 1 }}>
      <View style={{ flex: 0.88, backgroundColor: "pink" }}></View>
      <View
        style={{
          flex: 0.12,
          justifyContent: "center",
        }}
      >
        <Button
          title={"logout"}
          onPress={() => {
            Alert.alert("Wait!", "Are you trying to logout?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              { text: "confirm", onPress: () => removeUserSession(navigation) },
            ]);
          }}
        />
      </View>
    </View>
  );
}

export { Profile };
