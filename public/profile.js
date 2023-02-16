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

  let fullName = document.getElementById('fullName');
  let about = document.getElementById('about');
  let company = document.getElementById('company');
  let Job = document.getElementById('Job');
  let Country = document.getElementById('Country');
  let Address = document.getElementById('Address');
  let Phone = document.getElementById('Phone');
  let Email = document.getElementById('Email');

  function checkAuthState() {
    onAuthStateChanged(auth, (user => {
        if (user) {
          document.getElementById('signinwithgoogle').style.display = "none";
          document.getElementById('profilesubmit').addEventListener("click", AddDocument_CustomId);
        }
        else {

        }
        
    }));
  }
  checkAuthState();

  async function AddDocument_CustomId(){
    console.log("submit pressed");
    let ref = doc(db, "Vendors", Email.value);
    
    await setDoc(
        ref, {
            fullName : fullName.value,
            about : about.value,
            company : company.value,
            Job : Job.value,
            Country : Country.value,
            Address : Address.value,
            Phone : Phone.value,
            Email : Email.value
        }
    )
    .then(() =>{
        alert("Success");
    })
    .catch((error) =>{
        alert("Error" + error);
    });
  }

  

  
  
  
  
  
  
