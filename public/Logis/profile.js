import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, onSnapshot  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBGZXmCzPGAtEzn-W8RRhHKFqQPaCrglVE",
    authDomain: "codebreak40-f4d96.firebaseapp.com",
    projectId: "codebreak40-f4d96",
    storageBucket: "codebreak40-f4d96.appspot.com",
    messagingSenderId: "740182922074",
    appId: "1:740182922074:web:ffec0435973217faca1963",
    measurementId: "G-133TBFGR8Y"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

  let garagename = document.getElementById('garagename');
  let garageid = document.getElementById('garageid');
  let username = document.getElementById('username');
  let useremail = document.getElementById('useremail');
  let userphone = document.getElementById('userphone');
  let userlocation = document.getElementById('userlocation');

  function checkAuthState() {
    onAuthStateChanged(auth, (user => {
        if (user) {
          document.getElementById('profilesubmit').addEventListener("click", AddDocument_CustomId);
        }
        else {

        }
        
    }));
  }
  checkAuthState();

  async function AddDocument_CustomId(){
    let ref = doc(db, "Garages", garageid.value);
    
    await setDoc(
      ref, {
            garagename : garagename.value,
            garageid : garageid.value,
            username : username.value,
            useremail : useremail.value,
            userphone : userphone.value,
            userlocation : userlocation.value
        }
    )
    .then(() =>{
        alert("Data Saved Successfully");
    })
    .catch((error) =>{
        alert("Error" + error);
    });
  }