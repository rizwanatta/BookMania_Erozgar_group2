import React, { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import { Button } from "../../components/button/";
import { styles } from "./registerStyle";
import { Loading } from "../../components/loading";
import { attemptoRegisterNewUser } from "../../services/firebaseAuthHelper";

function Register({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isDisabled, setIsDisabled] = useState(true);

  onRegisterPressed = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      alert("you cant leave any field empty");
    } else {
      attemptoRegisterNewUser(email, password, firstName, lastName, navigation);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            placeholder="first name"
            onChangeText={setFirstName}
            style={styles.inputContainer}
          />
          <TextInput
            onChangeText={setLastName}
            placeholder="last name"
            style={styles.inputContainer}
          />
          <TextInput
            onChangeText={setEmail}
            placeholder="email"
            style={styles.inputContainer}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.inputContainer}
            onSubmitEditing={() => {
              setIsDisabled(false);
            }}
          />

          <Button
            disabled={isDisabled}
            title={"Register"}
            onPress={onRegisterPressed}
          />
        </View>
      </ScrollView>
      {loading === true && <Loading />}
    </>
  );
}

export { Register };
