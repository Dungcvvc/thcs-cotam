const path = require('path');
const db = require("../config.js")
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push } = require("firebase/database");
const { getFirestore, deleteDoc, query, where, Timestamp } = require("firebase/firestore");
const { doc, setDoc, addDoc, collection, getDocs, updateDoc, getDoc, } = require("firebase/firestore");

var jwt = require('jsonwebtoken');
const passwordtoken = "dgc";

function route(appp){

appp.post("/login", async (req, res) => {

    const data = {
    username:  req.body.username,
    password: req.body.password,
    }
    const docRef = doc(db, "user", data.username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        const dl = {
            id: data.username,
            password: docSnap.data().password,
            name: docSnap.data().name,
            avt: docSnap.data().avt,
            email: docSnap.data().email,
        }
        if(docSnap.data().password == data.password){
            //res.send({ msg : "Dang nhap thanh cong"});
            var token = jwt.sign({ id: data.username }, passwordtoken, {expiresIn: '2h'});
            res.cookie("token", token);
            
            res.json({msg : {message : "Dang nhap thanh cong"}, user:  dl});
            //console.log(docSnap.data(username));
        }else{
            res.json({ msg : {message: "Mat khau khong chinh xac"} })
        }
        //console.log("Document data:", docSnap.data().password);
      } else {
        res.json({ msg : {message: "Tai khoan khong chinh xac"} })
      }
});

appp.get("/checktoken", async (req, res) => {
   const token = req.cookies.token;

   console.log(token);
   if(token) {
    try {
        var id = jwt.verify(token, passwordtoken);
        const docRef = doc(db, "user", id.id);
        console.log(id.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
        const dl = {
            id: id.id,
            password: docSnap.data().password,
            name: docSnap.data().name,
            avt: docSnap.data().avt,
            email: docSnap.data().email,
        }
        res.json({msg : {message : "Dang nhap thanh cong"}, user:  dl});

    }
      } catch(err) {
        res.json({ msg : {message: "Loi doc token"} });
      }
   }else{
    res.json({ msg : {message: "Tai khoan chua dang nhap"} });
   } 
});

appp.post("/register", async (req, res, next) =>{
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var avt = req.body.avt;
    var email = req.body.email;

    const docR = doc(db, "test", username);
    const check = await getDoc(docR);
   
    if(check.data(username) != null){
        //res.send({msg: "User nay da ton tai"});
        //console.log("User nay da ton tai");
        //res.send({msg: "User nay da ton tai"});
        res.json({ msg : {message: "User nay da ton tai"} });
    }else{
        dky = setDoc(doc(db, "user", username), {
                                password: password,
                                name: name,
                                avt: avt,
                                email: email
                            });
        //res.send({msg: "Tao tai khoan thanh cong"});
        res.json({ msg : {message:"Tao tai khoan thanh cong"} })
    }
});

appp.get("/datauser", async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "user"));
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(list);
  });

appp.post("/finduser", async (req, res) => {
    const username = req.body.username;
    var checkuserfailed = true;  
    const querySnapshot = await getDocs(collection(db, "user"));
    for(var i = 0; i < querySnapshot.docs.length; i++) {
            if(querySnapshot.docs[i].id == username){
              res.json({avt: querySnapshot.docs[i].data().avt, name: querySnapshot.docs[i].data().name});    
              checkuserfailed = false;
              return;
            }       
    }
    if(checkuserfailed){
        res.json({ msg : {message:"Tai khoan khong ton tai"} })
    }
    //const list = querySnapshot.docs.map((doc) => ({ id: doc.id, members: doc.data().members, titleProject: doc.data().titleProject,creator: doc.data().creator }));
    
  });

appp.post("/update/profile", async (req, res) => {
    const username = req.body.username;
    const avt = req.body.avt;
    const email = req.body.email;
    const name = req.body.name;
    const dlt =  updateDoc(doc(db, "user", username), {
        avt: avt,
        email: email,
        name: name,
    });

    const docRef = doc(db, "user", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        const dl = {
            id: username,
            password: docSnap.data().password,
            name: docSnap.data().name,
            avt: docSnap.data().avt,
            email: docSnap.data().email,
        }
        res.json({ msg : {message:"Sua thong tin thanh cong"}, user:  dl })
      }
    //username.doc(id).delete();
    //res.send({ msg: "Doi avt thanh conng"});
    
});

appp.post("/update/password", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const dlt =  updateDoc(doc(db, "user", username), {
        password: password,
    });
    const docRef = doc(db, "user", username);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        const dl = {
            id: username,
            password: docSnap.data().password,
            name: docSnap.data().name,
            avt: docSnap.data().avt,
            email: docSnap.data().email,
        }
        res.json({ msg : {message:"Sua mat khau thanh cong"}, user:  dl })
      }
});

appp.post("/delete", async (req, res) => {
    const id = req.body.id;
    const dlt =  deleteDoc(doc(db, "user", id), {
        //id: id,
    });
    res.json({ msg : {message:"Xoa thanh cong"} })
});

}

module.exports = route;