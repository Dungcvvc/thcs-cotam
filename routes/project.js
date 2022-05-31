
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
        const time = req.body.time;
        dky = addDoc(collection(db, "project"), {
            titleProject: titleProject,
            avtProject: avtProject,
            description: description,
            creator: creator,
            members: members,
            date: date,
            time: time,
        });
        res.json({ msg : {message:"Tao du an thanh cong"} })
});


app.post("/project/take", async (req, res) => {

    const username = req.body.username;
    const arrays = [];
    const querySnapshot = await getDocs(collection(db, "project"));
    for(var i = 0; i < querySnapshot.docs.length; i++) {
            if(querySnapshot.docs[i].data().creator == username){
              arrays.push({id: querySnapshot.docs[i].id, description: querySnapshot.docs[i].data().description,
                date: querySnapshot.docs[i].data().date, avtProject: querySnapshot.docs[i].data().avtProject,
                members: querySnapshot.docs[i].data().members, creator: querySnapshot.docs[i].data().creator,
                titleProject: querySnapshot.docs[i].data().titleProject});
            }else{
              querySnapshot.docs[i].data().members.forEach(data => {
                if(data.username == username){
                  arrays.push({id: querySnapshot.docs[i].id, description: querySnapshot.docs[i].data().description,
                    date: querySnapshot.docs[i].data().date, avtProject: querySnapshot.docs[i].data().avtProject,
                    members: querySnapshot.docs[i].data().members, creator: querySnapshot.docs[i].data().creator,
                    titleProject: querySnapshot.docs[i].data().titleProject});
                }
              });
            }
    }
    //const list = querySnapshot.docs.map((doc) => ({ id: doc.id, members: doc.data().members, titleProject: doc.data().titleProject,creator: doc.data().creator }));
    res.json(arrays);
  });

app.get("/dataproject", async (req, res) => {
    const querySnapshot = await getDocs(collection(db, "project"));
    const list = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    res.json(list);
  });


  app.post("/findproject", async (req, res) => {
    const id = req.body.id;
    var checkuserfailed = true;  
    const querySnapshot = await getDocs(collection(db, "project"));
    for(var i = 0; i < querySnapshot.docs.length; i++) {
            if(querySnapshot.docs[i].id == id){
              res.json({id: id, description: querySnapshot.docs[i].data().description,
                date: querySnapshot.docs[i].data().date, avtProject: querySnapshot.docs[i].data().avtProject,
                members: querySnapshot.docs[i].data().members, creator: querySnapshot.docs[i].data().creator,
                titleProject: querySnapshot.docs[i].data().titleProject});    
              checkuserfailed = false;
              return;
            }       
    }
    if(checkuserfailed){
        res.json({ msg : {message:"Id khong ton tai"} })
    }
    //const list = querySnapshot.docs.map((doc) => ({ id: doc.id, members: doc.data().members, titleProject: doc.data().titleProject,creator: doc.data().creator }));
    
  });

app.post("/project/update", async (req, res) => {
  const idProject = req.body.idProject;
  const titleProject =  req.body.titleProject;
  const avtProject = req.body.avtProject;
  const description = req.body.description;
  const creator = req.body.creator;
  const members = req.body.members;
  const date = req.body.date;
  const dlt =  updateDoc(doc(db, "project", idProject), {
      titleProject: titleProject,
      avtProject: avtProject,
      description: description,
      creator: creator,
      members: members,
      date: date,
    });

    const docRef = doc(db, "project", idProject);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
        const dl = {
            id: idProject,
            titleProject: docSnap.data().titleProject,
            avtProject: docSnap.data().avtProject,
            description: docSnap.data().description,
            creator: docSnap.data().creator,
            members: docSnap.data().members,
            date: docSnap.data().date,
        }
        res.json({ msg : {message:"Sua thong tin thanh cong"}, user:  dl })
      }
    //username.doc(id).delete();
    //res.send({ msg: "Doi avt thanh conng"});
    
});
    
}
module.exports = project;