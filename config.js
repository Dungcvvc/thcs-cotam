const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push } = require("firebase/database");
const { getFirestore, deleteDoc, query, where, Timestamp } = require("firebase/firestore");
const { doc, setDoc, addDoc, collection, getDocs, updateDoc, getDoc, } = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyAGiXjXjETffo8LkFxk6rbtdDVcYwJhP4A",
    authDomain: "ptitworks-51075.firebaseapp.com",
    projectId: "ptitworks-51075",
    storageBucket: "ptitworks-51075.appspot.com",
    messagingSenderId: "523435858478",
    appId: "1:523435858478:web:9d7910b7424ca1279fddbf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = db;
