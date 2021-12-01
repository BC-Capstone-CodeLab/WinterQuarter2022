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
const dataRef  = ref(database, 'Edits/');

//const socket = io('http://localhost:3000')

const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
//socket.emit('new-user', name)
set(dataRef, {'new-user': name})
onValue(`${dataRef}/new-user`, appendMessage);
 
//socket.on('chat-message', data => {
//  appendMessage(`${data.name}: ${data.message}`)
//})
onValue(`${dataRef}/chat-message`, appendMessage);

//socket.on('user-connected', name => {
//  appendMessage(`${name} connected`)
//})
onValue(`${dataRef}/connected`, appendMessage);

//socket.on('user-disconnected', name => {
//  appendMessage(`${name} disconnected`)
//})
onValue(`${dataRef}/disconnected`, appendMessage);

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  //socket.emit('send-chat-message', message)
  set(dataRef, {edit: message})
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}


function sendDataToFirebase(data)
{
  //socket.emit('text', edit)
  set(dataRef, {edit: data});
}




