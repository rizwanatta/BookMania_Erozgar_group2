import firebase from "firebase";
import { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../components/button";
import { attemptToSignin } from "../../services/firebaseAuthHelper";
import { getUserSession } from "../../services/sessionHelper";
import { styles } from "./loginStyles";

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem("@is_logged_in");
      if (value !== null) {
        navigation.replace("Home");
      }
    } catch (e) {
      // error reading value
    }
  }, []);

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
      </View>
    </ScrollView>
  );
}

export { Login };
