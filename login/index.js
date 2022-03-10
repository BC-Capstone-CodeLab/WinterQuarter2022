import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';
import { getAuth, signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

var login_button;
var logout_button;
var signup_button;
var cancel_button;
var reference_click;

var firebase_auth;

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDICcooHUciQZvAs_dPpExVxqBhtJMojbY",
  authDomain: "codelab-database-1.firebaseapp.com",
  databaseURL: "https://codelab-database-1-default-rtdb.firebaseio.com",
  projectId: "codelab-database-1",
  storageBucket: "codelab-database-1.appspot.com",
  messagingSenderId: "573387563239",
  appId: "1:573387563239:web:161f23412c218ba50ac242",
  measurementId: "G-4XTVC35JQL"
};

const firebaseApp = initializeApp(firebaseConfig);
firebase_auth = getAuth(firebaseApp);

/** console.log(firebase_auth); **/

function login(){

  let userEmail = document.querySelector('#email_input').value;
  let userPasswd = document.querySelector('#password_input').value;

  signInWithEmailAndPassword(firebase_auth, userEmail, userPasswd)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
	var email_id = user.email;
	
	document.querySelector('#user_vue').innerHTML = `Welcome User : ${email_id}`;
	console.log(`User credential: ${user}`);

	alert("Error : " + errorMessage);
	
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}

function logout(user)
{
	signOut(firebase_auth).then(() => {
		// Sign-out successful.
		console.log("User has successfully logged out.");
	}).catch((error) => {
		// An error happened.
		window.alert('Unexpected');
		console.log(error);
	});
}

function signup()
{
  let userEmail = document.querySelector('input[name="email"]').value;
  let userPasswd = document.querySelector('input[name="psw"]').value;
  let userPasswd_repeat  = document.querySelector('input[name="psw-repeat"]').value;
  
  if (userPasswd !== userPasswd)
  {
	  console.error('Password doesn\'t match');
	  return;
  }
  
  createUserWithEmailAndPassword(firebase_auth, userEmail, userPasswd)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('You\'ve signed in!');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
	
  });
	
}

function cancel ()
{
	document.querySelector('input[name="psw"]').value = '';
	document.querySelector('input[name="psw-repeat"]').value = '';
	document.querySelector('input[name="email"]').value = '';
}

function show(event)
{
	if (event.target.textContent === 'Login')
	{
			document.querySelector('#login_div').style.display = "block";
			document.querySelector('.container').style.display = "none"
	}
	else if (event.target.textContent === 'Sign up')
	{
			document.querySelector('#login_div').style.display = "none"
			document.querySelector('.container').style.display = "block"
	}
	else
	{
		alert('Unexpected Case!!');
		/** event.target.closest('a') **/
	}
}


login_button = document.querySelector('#login_button');
logout_button = document.querySelector('#logout_button');
signup_button = document.querySelector('.signupbtn');
cancel_button = document.querySelector('.cancelbtn');
reference_click = document.querySelector('#reference');



login_button.addEventListener('click', login);
logout_button.addEventListener('click', logout)
signup_button.addEventListener('click', signup);
cancel_button.addEventListener('click', cancel);
reference_click.addEventListener('click', show);
