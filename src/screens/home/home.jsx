import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingAction } from "react-native-floating-action";

import { AddNewBookModal } from "../../components/addBookModal";

function Home() {
  const [show, setShow] = useState(false);

  function onClosePressed() {
    setShow(!show);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FloatingAction
          showBackground={false}
          onPressMain={() => setShow(!show)}
          color="orange"
        />
      </View>
      <AddNewBookModal show={show} onClosePressed={onClosePressed} />
    </SafeAreaView>
  );
}

export { Home };
