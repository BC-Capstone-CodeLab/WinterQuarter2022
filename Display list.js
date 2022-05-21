
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update, get } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
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

// Get a reference to the database service
var classdb = getDatabase(app);
var classIDlist = "";
get(child(dbRef, Classes)).then((snapshot) => {
    if (snapshot.exists()) {
        classIDlist = snapshot.val();
    }
    else {
        console.log("no data available")
    }
}).catch((error) => {
    console.error(error);
})
document.getElementById("classID").innerHTML = classIDlist