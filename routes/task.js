const db = require("../config.js")
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, push } = require("firebase/database");
const { getFirestore, deleteDoc, query, where, Timestamp } = require("firebase/firestore");
const { doc, setDoc, addDoc, collection, getDocs, updateDoc, getDoc, } = require("firebase/firestore");

function task(app){

app.post("/createtask", async (req, res) => {

    const idproject = req.body.idproject;
    const titletask = req.body.titletask;
    const status = req.body.status;
    const date = req.body.date;
    const time = req.body.time;
    const description = req.body.description;
    const image = req.body.image;
    const performer = req.body.performer;
    const deadlinedate = req.body.deadlinedate;
    const dealinetime = req.body.dealinetime;
    dky = addDoc(collection(db, "task"), {
        idproject: idproject,
        titletask:titletask,
        status: status,
        date: date,
        time: time,
        description: description,
        image: image,
        performer: performer,
        deadlinedate: deadlinedate,
        dealinetime: dealinetime,
        });
        res.json({ msg : {message:"Tao nhiem vu thanh cong"} })
});

app.post("/project/task/take", async (req, res) => {

    const idproject = req.body.idproject;
    const arrays = [];
 
    const querySnapshot = await getDocs(collection(db, "task"));
    for(var i = 0; i < querySnapshot.docs.length; i++) {
            if(querySnapshot.docs[i].data().idproject == idproject){
              arrays.push({id: querySnapshot.docs[i].id, data: querySnapshot.docs[i].data()});
            }
    }
    res.json(arrays);
});

app.post("/task/delete", async (req, res) => {
    const idtask = req.body.idtask;
    const dlt =  deleteDoc(doc(db, "task", idtask), {
        //id: id,
    });
    res.json({ msg : {message:"Xoa thanh cong"} })
});


app.post("/project/task/update/status", async (req, res) => {

    const idtask = req.body.idtask;
    const status = req.body.status;
 
    const dlt =  updateDoc(doc(db, "task", idtask), {
        status: status,
          });
    res.json({ msg : {message:"Thay doi trang thai thanh cong"}})
});

app.post("/task/delete", async (req, res) => {
    const idtask = req.body.idtask;
    const dlt =  deleteDoc(doc(db, "task", idtask), {
        //id: id,
    });
    res.json({ msg : {message:"Xoa thanh cong"} })
});
}


module.exports = task;