import React, { useState } from "react";

import Modal from "react-native-modal";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button } from "../components/button";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { firebase } from "../services/firebasHelper";

function AddNewBookModal({ show, onClosePressed }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadTheImage = async () => {
    let storageBookRef = firebase.storage().ref("books/");

    // blob making code
    let img = await fetch(image);
    let imgBlob = await img.blob();

    storageBookRef
      .child("1")
      .put(imgBlob)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Modal
      animationIn={"bounceInLeft"}
      animationInTiming={1000}
      animationOut={"bounceOutRight"}
      animationOutTiming={1000}
      isVisible={show}
    >
      <View style={styles.mainContainer}>
        <View style={styles.formView}>
          <Text style={styles.fromTitle}>Add Your Favourite Book</Text>

          <TextInput placeholder="Book Name" style={styles.inputCon} />

          <TextInput placeholder="Book Author" style={styles.inputCon} />

          <TextInput placeholder="Book Date" style={styles.inputCon} />

          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
            style={styles.uploaderCon}
          >
            <Text>Upload Book Cover</Text>
            <FontAwesome5 name="upload" size={35} color="black" />
          </TouchableOpacity>

          {image && (
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
              <Button
                style={{
                  width: "35%",
                  backgroundColor: "red",
                  padding: 10,
                  margin: 10,
                  borderRadius: 10,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={uploadTheImage}
                title={"upload"}
              />
            </View>
          )}
        </View>

        <Button onPress={onClosePressed} title={"close"} />
      </View>
    </Modal>
  );
}

export { AddNewBookModal };

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    height: "80%",
  },
  formView: {
    height: "90%",
    padding: 10,
  },
  fromTitle: {
    fontSize: 24,
    margin: 10,
    fontWeight: "bold",
  },
  inputCon: {
    padding: 5,
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
  },
  uploaderCon: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    margin: 10,
  },
});
