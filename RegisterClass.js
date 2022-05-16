import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
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

// IMPORTANT: add default user entry to database if no existing user entries, default entry is required for functions to work
// username is "default" and password is "default" but it can be anything as long as there is username and password
// comment line below when default user is in database after executing it whenever necessary
// userdb.child("users").child("default").set({"username": "default", "password": "default", "classes": "default"});

// this function allows users to register to CodeClass website and have their user login information stored in firebase database
function generateString(length) {
   let result = ' ';
   const charactersLength = characters.length;
   for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;
}

// function alertrando() {
//     alert(generateString(4));
// }
function register()
{
   // retrieve existing usernames
   console.log("test");
   var className = document.getElementById("className").value;
   var teacher = document.getElementById("teacher").value;
   var rando = generateString(4);
   var classList = [];
   var all_classes = {};
   all_classes = classdb.child("classes").get();
   for (const classes in all_classes)
   {
       classList.push(classes.key);
   }

   // check to see if username already taken in database
  if(classList.includes(className))
   {
       console.log("ClassName already taken, please try again.");
   }
   // add user to database
   else
   {
       var data = {"className": className,"teachername": teacher, "invitecode": rando};
       classdb.child("Classes").child(className).set(data);
       alert("Class Generated!");

   }
}


function joinclass() {
   var className = document.getElementById("className").value;
   var invitecode = document.getElementById("invite").value;

   var classList = [];
   var all_classes = {};
   all_classes = classdb.child("classes").get();
   for (const classes in all_classes)
   {
       classList.push(classes.key);
   }

   if(classList.includes(className)){
       get(child(classdb, 'classes/className/${invite}')).then((snapshot) => {
           if (snapshot.exists()) {
               var actualcode = snapshot;
               if (actualcode == invitecode) {
                   alert("class joined!");
               }
               else {
                   alert("Incorrect Invite Code");
               }
           }
       })
   }

}

