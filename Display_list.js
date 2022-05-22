
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update, get, child } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
// import { getAuth } from "firebase/auth";

// const auth = getAuth();
// const user = auth.currentUser;
// import {initializeApp} from 'firebase/app'
// import {getDatabase} from "firebase/database";

// // Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyC0smKAfTO24yVrTc0HXY-Krtch09othQY",
   authDomain: "userloginregistration-a365f.firebaseapp.com",
   databaseURL: "https://userloginregistration-a365f-default-rtdb.firebaseio.com",
   projectId: "userloginregistration-a365f",
   storageBucket: "userloginregistration-a365f.appspot.com",
   messagingSenderId: "586687950561",
   appId: "1:586687950561:web:b01dfc2b663f64386791a0"
};

const app = initializeApp(firebaseConfig);

window.addEventListener('load', function() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
      if (user) {
        var uid = user.uid;
        get(child(dbRef, `Users/` + uid)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            classIDlist = JSON.stringify(snapshot.val());
            
            var jsontest = '{"name": "Peter", "age": 22, "country": "United States"}'
            console.log(classIDlist);
            console.log(jsontest);
            var classes = JSON.parse(classIDlist);
            console.log(classes.Capstone.className);
            document.getElementById("classid").innerHTML = classes.className;
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
      }
      else {
          console.log("user does not exist");
      }
  })
});
// Get a reference to the database service
const dbRef = ref(getDatabase(app));
var classIDlist = ""
get(child(dbRef, `Users/` + user.uid + "/classList")).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    classIDlist = JSON.stringify(snapshot.val());
     
    var classes = JSON.parse(classIDlist);
    console.log(classes.Capstone.className);
    document.getElementById("classid").innerHTML = classes.className;
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

 
console.log(classIDlist);