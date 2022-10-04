import react, { useState, useEffect } from "react";

import { View, Text } from "react-native";
import MapView, { MapMarker, PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from "./locationStyles";

import * as ExpoLocation from "expo-location";

function Location({}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await ExpoLocation.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={{ backgroundColor: "red", flex: 1 }}>
      <MapView
        style={styles.map}
        mapType={"hybrid"}
        zoomControlEnabled={true}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      >
        <MapMarker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={"hello"}
        />
        <MapMarker
          coordinate={{
            latitude: 31.5925194,
            longitude: 74.3072963,
          }}
          title={"minare pakistan"}
        />
      </MapView>
    </View>
  );
}

export { Location };
