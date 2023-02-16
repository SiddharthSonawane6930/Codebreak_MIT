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

  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let productname = document.getElementById('productname');
  let productid = document.getElementById('productid');
  let quantity = document.getElementById('quantity');
  let message = document.getElementById('message');
  let location = document.getElementById('location');
  

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
    let ref = doc(db, "Orders", productid.value);
    let boolval = true;
    
    await setDoc(
      ref, {
            name : name.value,
            email : email.value,
            productname : productname.value,
            productid : productid.value,
            quantity : quantity.value,
            message : message.value,
            boolval : boolval,
            location : location.value
        }
    )
    .then(() =>{
        alert("Data Saved Successfully");
    })
    .catch((error) =>{
        alert("Error" + error);
    });
  }