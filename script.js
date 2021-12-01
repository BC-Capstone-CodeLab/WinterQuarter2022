import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-database.js";

const firebaseConfig = 
{
  apiKey: "AIzaSyDICcooHUciQZvAs_dPpExVxqBhtJMojbY",
  authDomain: "codelab-database-1.firebaseapp.com",
  projectId: "codelab-database-1",
  storageBucket: "codelab-database-1.appspot.com",
  messagingSenderId: "573387563239",
  appId: "1:573387563239:web:161f23412c218ba50ac242",
  measurementId: "G-4XTVC35JQL"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef  = ref(database, 'messages/');

//const socket = io('http://localhost:3000')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
displayMessage('You joined')

//Write new-user name to firebase database
set(dataRef, {'new-user': name})

//Listen to firebase database and update othe sessions
onValue(dataRef, displayMessage);
 
//socket.on('chat-message', data => {
//  appendMessage(`${data.name}: ${data.message}`)
//})
onValue(dataRef, displayMessage);

//socket.on('user-connected', name => {
//  appendMessage(`${name} connected`)
//})
onValue(dataRef, displayMessage);

//socket.on('user-disconnected', name => {
//  appendMessage(`${name} disconnected`)
//})
onValue(dataRef, displayMessage);

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  displayMessage(`You: ${message}`)
  //socket.emit('send-chat-message', message)
  set(dataRef, {edit: message})
  messageInput.value = ''
})

function displayMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}