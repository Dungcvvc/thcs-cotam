const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push } = require("firebase/database");
const { getFirestore, deleteDoc, query, where, Timestamp } = require("firebase/firestore");
const { doc, setDoc, addDoc, collection, getDocs, updateDoc, getDoc, } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyDmQH8tj-2PSD3G9uYrYzcm9j6VFNIhu20",
  authDomain: "appmyptitworks.firebaseapp.com",
  projectId: "appmyptitworks",
  storageBucket: "appmyptitworks.appspot.com",
  messagingSenderId: "833742736896",
  appId: "1:833742736896:web:ead9c6c515dbb8342452e5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = db;
