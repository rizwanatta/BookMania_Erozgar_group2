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
import { Loading } from "../components/loading";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { firebase } from "../services/firebasHelper";
import { getUniqueBookName } from "../services/help";

function AddNewBookModal({ show, onClosePressed }) {
  const [image, setImage] = useState(null);

  // form states for the books
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDate, setBookDate] = useState("");

  const [imageDownloadUrl, setImageDownloadUrl] = useState("");

  // this is for loading indicator

  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadTheImage = async () => {
    let storageBookRef = firebase.storage().ref("books/");

    // blob making code
    let img = await fetch(image);

    let uniqueBookName = getUniqueBookName(bookName);

    let imgBlob = await img.blob();

    storageBookRef
      .child(uniqueBookName)
      .put(imgBlob)
      .then((response) => {
        firebase
          .storage()
          .ref("books/" + uniqueBookName)
          .getDownloadURL()
          .then((downloadResponse) => {
            setImageDownloadUrl(downloadResponse);
          })
          .catch((downloadError) => {
            console.log(downloadError);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const uploadBook = () => {
    setLoading(true);

    console.log(bookAuthor, bookName, bookDate, imageDownloadUrl);

    // this will get me the user id
    const userId = firebase.auth().currentUser.uid;

    firebase
      .firestore()
      .collection("books")
      .doc(userId)
      .set({
        bookAuthor,
        bookName,
        bookDate,
        imageDownloadUrl,
      })
      .then((response) => {
        setLoading(false);
        alert("your book got uploaded");
      })
      .catch((error) => {
        setLoading(false);
      });

    console.log(userId);
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

          <TextInput
            placeholder="Book Name"
            onChangeText={setBookName}
            style={styles.inputCon}
          />

          <TextInput
            placeholder="Book Author"
            onChangeText={setBookAuthor}
            style={styles.inputCon}
          />

          <TextInput
            placeholder="Book Date"
            onChangeText={setBookDate}
            style={styles.inputCon}
          />

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

        <Button onPress={uploadBook} title={"upload book"} />

        <View style={{ marginVertical: 10 }}>
          <Button onPress={onClosePressed} title={"close"} />
        </View>
      </View>

      {loading && <Loading />}
    </Modal>
  );
}

export { AddNewBookModal };

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    height: "90%",
  },
  formView: {
    height: "80%",
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
