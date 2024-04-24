// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDV6hBrapqdck7-7cW57QgYZ4i13rCXkhw",
  authDomain: "manawa-test.firebaseapp.com",
  databaseURL: "https://manawa-test-default-rtdb.firebaseio.com",
  projectId: "manawa-test",
  storageBucket: "manawa-test.appspot.com",
  messagingSenderId: "485663881489",
  appId: "1:485663881489:web:03125415202708e132f4b0",
  measurementId: "G-L3VW6G4WX2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);