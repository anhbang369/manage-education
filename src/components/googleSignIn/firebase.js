// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-rzPVB_76mEBepUomejmZ8LwH-Y1h2qc",
    authDomain: "manage-education.firebaseapp.com",
    projectId: "manage-education",
    storageBucket: "manage-education.appspot.com",
    messagingSenderId: "1063941285710",
    appId: "1:1063941285710:web:a31a6009d0c5c0520de01f",
    measurementId: "G-WW26W9ZFNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export { auth, provider };