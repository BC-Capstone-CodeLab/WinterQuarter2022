import { getDatabase, ref, set, onValue, update, get } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";

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



// Get a reference to the database service



// Set up our register function 
let btn = document.getElementById("reg")
btn.addEventListener("click", function() {
  // Get all our input fields
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var full_name = document.getElementById('full_name').value


  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return 
    // Don't continue running the code
  }

  
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email, 
      full_name : full_name,
      last_login : Date.now(),
      classList: null
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
});

// Set up our login function
let btn2 = document.getElementById("login")
btn2.addEventListener("click", function() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return 
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.full_name).update(user_data)

    // DOne
    window.location.href = "CodeClassNaviHome.html"

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
});




// Validate Functions
function validate_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}