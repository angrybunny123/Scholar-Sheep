import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbEAqq9PukE2pnIfmfiXe7kGGD5X1aYCs",
  authDomain: "scholar-sheep.firebaseapp.com",
  databaseURL: "https://scholar-sheep.firebaseio.com",
  projectId: "scholar-sheep",
  storageBucket: "scholar-sheep.appspot.com",
  messagingSenderId: "713013589985",
  appId: "1:713013589985:web:f3bf6ef235b0bea29644a0",
  measurementId: "G-0ZY5E0ZRDJ",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
