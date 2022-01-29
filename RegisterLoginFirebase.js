// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0smKAfTO24yVrTc0HXY-Krtch09othQY",
    authDomain: "userloginregistration-a365f.firebaseapp.com",
    databaseURL: "https://userloginregistration-a365f-default-rtdb.firebaseio.com",
    projectId: "userloginregistration-a365f",
    storageBucket: "userloginregistration-a365f.appspot.com",
    messagingSenderId: "586687950561",
    appId: "1:586687950561:web:b01dfc2b663f64386791a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const userdb = getDatabase(app);

// IMPORTANT: add default user entry to database if no existing user entries, default entry is required for functions to work
// username is "default" and password is "default" but it can be anything as long as there is username and password
// comment line below when default user is in database after executing it whenever necessary
// userdb.child("users").child("default").set({"username": "default", "password": "default", "classes": "default"});

// this function allows users to register to CodeClass website and have their user login information stored in firebase database
function register(userName, password0, password1)
{
    // retrieve existing usernames
    var userList = [];
    var all_users = {};
    all_users = userdb.child("users").get();
    for (const user in all_users)
    {
        userList.push(user.key);
    }
    // checking for user input
    if (userName.length < 1 || password0.length < 1 || password1.length < 1)
    {
        console.log("Username or password must be 1 or more characters. Please try again.");
    }
    // check to see if passwords match when verifying password when creating account
    else if(password0 != password1)
    {
        console.log("Passwords do not match, please try again.");
    }
    // check to see if username already taken in database
    else if(userList.includes(userName))
    {
        console.log("Username already taken, please try again.");
    }
    // add user to database
    else
    {
        var data = {"username": userName,"password": password0,"classes": "default"};
        userdb.child("users").child(userName).set(data);
        console.log("Account created successfully.");
    }
}

// test register function
//register("Chad123", "3200e", "3200e");

// this function checks if user input matches information stored in database to allow users to login to CodeClass website with that user information
function login(userName, password)
{
    // retrieve existing usernames and passwords and put in key value pair in javascript object
    var userObjList = {};
    var all_users = {};
    all_users = userdb.child("users").get();
    for (const user in all_users)
    {
        userObjList[user.key] = userdb.child("users").child(user.key).child("password").get().val();
    }
    // checking for user input
    if(userName.length < 1 || password.length || 1)
    {
        console.log("Username or password must be 1 or more characters, please try again.");
    }
    // if username exists and password matches with password associated with that username then 
    // login is successful and user can access website with the account
    else if(userName in userObjList)
    {
        for(const currentUserName in userObjectList)
        {
            if(currentUserName == userName && userObjList[currentUserName] == password)
            {
                console.log("Login successful.");
                // show welcome or home page for user
                break;
            }
            else if(currentUserName == userName && userObjList[currentUserName] != password)
            {
                console.log("Invalid username or password, please try again.");
                break;
            }
        }
    }
    // username does not exist
    else
    {
        console.log("Invalid username or password, please try again.");
    }
}
 
// test login function
//login("John123", "3200e");

