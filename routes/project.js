
const db = require("../config.js")
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push } = require("firebase/database");
const { getFirestore, deleteDoc, query, where, Timestamp } = require("firebase/firestore");
const { doc, setDoc, addDoc, collection, getDocs, updateDoc, getDoc, } = require("firebase/firestore");

function project(app) {



    
app.post("/createproject", async (req, res) => {

        const titleProject =  req.body.titleProject;
        const avtProject = req.body.avtProject;
        const description = req.body.description;
        const creator = req.body.creator;
        const members = req.body.members;
        const date = req.body.date;
        dky = addDoc(collection(db, "project"), {
            titleProject: titleProject,
            avtProject: avtProject,
            description: description,
            creator: creator,
            members: members,
            date: date,
        });
        res.json({ msg : {message:"Tao du an thanh cong"} })
});


app.get("/takeproject", async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "project"));
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, members: doc.data().members, titleProject: doc.data().titleProject }));
    res.send(list);
  });

app.get("/dataproject", async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "project"));
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    res.send(list);
  });
    
}
module.exports = project;