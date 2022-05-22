
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, onValue, update, get } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";


// import {initializeApp} from 'firebase/app'
// import {getDatabase} from "firebase/database";

// // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC0smKAfTO24yVrTc0HXY-Krtch09othQY",
    authDomain: "userloginregistration-a365f.firebaseapp.com",
    databaseURL: "https://userloginregistration-a365f-default-rtdb.firebaseio.com",
    projectId: "userloginregistration-a365f",
    storageBucket: "userloginregistration-a365f.appspot.com",
    messagingSenderId: "586687950561",
    appId: "1:586687950561:web:b01dfc2b663f64386791a0"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()



let btn = document.getElementById("registerbtn")
btn.addEventListener("click", function() {
    var className = document.getElementById("className").value;
    var teacher = document.getElementById("teacher").value;
    var rando = generateString(4);
    var classID = generateString(5);
    console.log(classID);
    var database_ref = database.ref();
    var user = auth.currentUser;
    alert("Invite Code is:" + rando);
   
alert("test1");
  alert("test2");
  var data = {
      className: className,
      teacherName: teacher,
      inviteCode: rando
  };

  var classdata = {className: className};
  database_ref.child('Classes/' + className).set(data);
  database_ref.child('users/' + user.uid +'/classList').set(classdata);
 alert(classdata);
    // }
});
// IMPORTANT: add default user entry to database if no existing user entries, default entry is required for functions to work
// username is "default" and password is "default" but it can be anything as long as there is username and password
// comment line below when default user is in database after executing it whenever necessary
// userdb.child("users").child("default").set({"username": "default", "password": "default", "classes": "default"});

// this function allows users to register to CodeClass website and have their user login information stored in firebase database


function generateString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   let result = '';
   const charactersLength = characters.length;
   for ( let i = 0; i < length; i++ ) {

       result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// function listclassdetails() {
//     var all_classes = {};
//     var user_classes = [];
//     all_classes = classdb.child("classes").get()
//     for (const classes in all_classes) {
//         if (classes.members.includes(user)) {
//             user_classes.push(classes);

//         }

//     }
// }
// function alertrando() {
//     alert(generateString(4));
// }



// let btn2 = document.getElementById("joinclass")
// btn2.addEventListener("click", function() {
//    var className = document.getElementById("className").value;
//    var invitecode = document.getElementById("invite").value;

//    var classList = [];
//    var all_classes = {};
//    all_classes = classdb.child("Classes").get();
//    for (const classes in all_classes)
//    {
//        classList.push(classes.key);
//    }

//    if(classList.includes(className)){
//        get(child(classdb, 'classes/className/${invite}')).then((snapshot) => {
//            if (snapshot.exists()) {
//                var actualcode = snapshot;
//                if (actualcode == invitecode) {
//                    alert("class joined!");
//                }
//                else {
//                    alert("Incorrect Invite Code");
//                }
//            }
//        })
//    }

// };
// }

