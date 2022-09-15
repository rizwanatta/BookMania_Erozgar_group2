// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1TxOudxcqfEQcXUimGfepJZXJW9wNARY",
  authDomain: "bookseroza.firebaseapp.com",
  projectId: "bookseroza",
  storageBucket: "bookseroza.appspot.com",
  messagingSenderId: "121638592149",
  appId: "1:121638592149:web:1f79f62e0810adb7b6459c"
};

// firebase ke liescence shuda invokation is needed only one time
if (firebase.apps.length > 0 === false) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export { firebase };