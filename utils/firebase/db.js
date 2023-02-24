// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebaseConfig = {
  apiKey: "AIzaSyAtxAlBMMAMu_QIKbnCizu1nZjMxsZHC7Q",
  authDomain: "memoriesar-f08a7.firebaseapp.com",
  projectId: "memoriesar-f08a7",
  storageBucket: "memoriesar-f08a7.appspot.com",
  messagingSenderId: "718466561093",
  appId: "1:718466561093:web:a3422d6ebf706de3065f2c",
  measurementId: "G-6WGLSR82RQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;
// const analytics = getAnalytics(app);

// // Requiring firebase (as our db)
// const firebase = require('firebase');
// // Importing our configuration to initialize our app
// const config = require('./config');
// // Creates and initializes a Firebase app instance. Pass options as param
// const db = firebase.initializeApp(config.firebaseConfig);
// module.exports = db;
