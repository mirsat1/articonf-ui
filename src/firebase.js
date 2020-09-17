import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCj5lNVg-NHvZTnElYEKruT8ktUItVj6cg",
    authDomain: "articonf2.firebaseapp.com",
    databaseURL: "https://articonf2.firebaseio.com",
    projectId: "articonf2",
    storageBucket: "articonf2.appspot.com",
    messagingSenderId: "492156780518",
    appId: "1:492156780518:web:1304a1058f295ca8a3e027",
    measurementId: "G-RR37B6F1ZD"
  });
  
  export default app;