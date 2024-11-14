// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApMt3soPdGR0SlMm1zTnAAjm0LbLl-TgU",
  authDomain: "expense-tracker-422111.firebaseapp.com",
  projectId: "expense-tracker-422111",
  storageBucket: "expense-tracker-422111.appspot.com",
  messagingSenderId: "59626792181",
  appId: "1:59626792181:web:b61eba6749264a2f3491bc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);