// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZtf9RoKl1xxwKLW8d6IH8QpvL_5FViNM",
  authDomain: "simple-email-password-au-38da9.firebaseapp.com",
  projectId: "simple-email-password-au-38da9",
  storageBucket: "simple-email-password-au-38da9.appspot.com",
  messagingSenderId: "521851273236",
  appId: "1:521851273236:web:1bcd4e5f887851a763e701"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;