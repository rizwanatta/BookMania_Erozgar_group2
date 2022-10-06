import React, { useEffect, useState } from "react";
import { Text, Image, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingAction } from "react-native-floating-action";

import { AddNewBookModal } from "../../components/addBookModal";
import firebase from "firebase";

function Home() {
  const [show, setShow] = useState(false);
  const [books, setBooks] = useState([]);

  function onClosePressed() {
    setShow(!show);
  }

  // when app opens home page fetch user books please
  useEffect(() => {
    fetchBookfromFirebase();
  }, []);

  const fetchBookfromFirebase = () => {
    firebase
      .firestore()
      .collection("books")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((res) => {
          /// check kro k collection ma koi data aya b h k nei
          if (res.data()) {
            // check kro k book ke array ma data aya be h ya nei
            if (books.length) {
              // agr data ageya tha to
              setBooks([...books, res.data()]);
            } else {
              //   books ke array ma data daal 2
              books.push(res.data());
            }
          }

          console.log(books);
        });
      });
  };

  // this will be each book in the list design card
  const renderItem = ({ item }) => (
    <View style={{ padding: 10, margin: 10, backgroundColor: "pink" }}>
      <Image
        style={{ width: 100, height: 100 }}
        source={
          item.imageDownloadUrl !== ""
            ? { uri: item.imageDownloadUrl }
            : require("../../assets/not_found.jpeg")
        }
        resizeMode={"contain"}
      />

      <Text style={{ fontSize: 20 }}>book title</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.bookName}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList data={books} renderItem={renderItem} />

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
