import { initializeApp } from 'firebase/app';
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
var firebase = require('firebase');
var firebaseui = require('firebaseui');
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBIvTeVMxoxe7dj_20766Uu87Bx0hsAR34",
    authDomain: "coin-tosser-230b1.firebaseapp.com",
    projectId: "coin-tosser-230b1",
    storageBucket: "coin-tosser-230b1.appspot.com",
    messagingSenderId: "276499774390",
    appId: "1:276499774390:web:5691c6891fc1d5fe1bdf17",
    measurementId: "G-5RGCHG51TM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
var ui = new firebaseui.auth.AuthUI(firebase.auth());

const auth = getAuth();
/*
createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
    */