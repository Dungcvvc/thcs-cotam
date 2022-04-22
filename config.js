const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push } = require("firebase/database");
const { getFirestore, deleteDoc, query, where, Timestamp } = require("firebase/firestore");
const { doc, setDoc, addDoc, collection, getDocs, updateDoc, getDoc, } = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyBbRLp8pq17-uvcK244kFFXzBVTbtQ9uQw",
    authDomain: "ptitworks-v2.firebaseapp.com",
    projectId: "ptitworks-v2",
    storageBucket: "ptitworks-v2.appspot.com",
    messagingSenderId: "81649602707",
    appId: "1:81649602707:web:11457b600221f9128efd66"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = db;
