import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";

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

  document.getElementById('signinwithgoogleuser').addEventListener("click", googleauth);
  document.getElementById('logoutuser').addEventListener("click", LogoutUser);


  

  document.getElementById('logoutuser').style.display = "none";

  function googleauth(){
    console.log("pressed");
    signInWithPopup(auth, provider)
    .then((result) => {
      document.getElementById('signinwithgoogleuser').style.display = "none";
      document.getElementById('logoutuser').style.display = "block";
    }).catch((error) => {
        console.log(error);
    });
  }

  function checkAuthState() {
    onAuthStateChanged(auth, (user => {
        if (user) {
          document.getElementById('signinwithgoogleuser').style.display = "none";
          document.getElementById('logoutuser').style.display = "block";
          showvendorname(user);
          console.log(user)
        }
        else {

        }
    }));
  }
  checkAuthState();

  function showvendorname(user){
    document.getElementById('userlogindetail').innerHTML = `
      <h3>Welcome ${user.displayName}</h3>
    `;
    document.getElementById('vendornamenav').innerHTML = `
      <span>${user.displayName}</span>
    `;
    document.getElementById('vendorimgnav').innerHTML = `
    <img src = "${user.photoURL}"></img>
    `;

    document.getElementById('profilename').innerHTML = `
      <h2>${user.displayName}</h2>
    `;

    document.getElementById('profileimg').innerHTML = `
    <img src = "${user.photoURL}"></img>
    `;
    
  }

  function LogoutUser() {
    console.log('logout');
    location.reload();
    signOut(auth, provider).then(() => {
        document.getElementById('signinwithgoogleuser').style.display = "block";
        document.getElementById('logoutuser').style.display = "none";
    }).catch(e => {
        console.log(e);
    })
  }

  
