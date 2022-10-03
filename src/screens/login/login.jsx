import firebase from "firebase";
import { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { View, ScrollView, Image, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../components/button";
import { attemptToSignin } from "../../services/firebaseAuthHelper";
import { getUserSession } from "../../services/sessionHelper";
import { styles } from "./loginStyles";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUri, setPhotoUri] = useState("");

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const cameraRef = useRef();

  useEffect(async () => {
    requestPermission();
    try {
      const value = await AsyncStorage.getItem("@is_logged_in");
      if (value !== null) {
        navigation.replace("Home");
      }
    } catch (e) {
      // error reading value
    }
  }, []);

  const __takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    setPhotoUri(photo.uri);
  };

  return (
    <ScrollView>
      <View style={styles.formCon}>
        <TextInput
          onChangeText={setEmail}
          style={styles.inputContainer}
          placeholder={"email"}
        />
        <TextInput
          style={styles.inputContainer}
          onChangeText={setPassword}
          placeholder={"password"}
          secureTextEntry={true}
        />
        <Button
          title={"Login"}
          onPress={() => {
            attemptToSignin(email, password, navigation);
          }}
          disabled={email === "" || password === "" ? true : false}
        />

        <Camera
          style={{ width: "100%", height: 300 }}
          type={"back"}
          ref={cameraRef}
        />

        <Button title={"Capture image"} onPress={__takePicture} />

        <Image style={{ width: 100, height: 100 }} source={{ uri: photoUri }} />
      </View>
    </ScrollView>
  );
}

export { Login };
