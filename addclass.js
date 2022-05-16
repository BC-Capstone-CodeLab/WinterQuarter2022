

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyC0smKAfTO24yVrTc0HXY-Krtch09othQY",
  authDomain: "userloginregistration-a365f.firebaseapp.com",
  databaseURL: "https://userloginregistration-a365f-default-rtdb.firebaseio.com",
  projectId: "userloginregistration-a365f",
  storageBucket: "userloginregistration-a365f.appspot.com",
  messagingSenderId: "586687950561",
  appId: "1:586687950561:web:c606dd29f78435036791a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


function writeclassData(){
    alert("HI");
    const database = getDatabase(app);
    const reference = ref(db, 'classes/' + ClassID);
    var rando = generateString(4);
    var classname = document.getElementById("className").value;
    var teachername = document.getElementById("teacher").value;

    set(reference,{

        ClassName: classname,
        InviteCode: rando,
        TeacherName: teachername
    });
}