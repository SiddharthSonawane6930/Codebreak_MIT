import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, onSnapshot, query, where  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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

  document.getElementById('signinwithgoogle').addEventListener("click", googleauth);
  document.getElementById('logout').addEventListener("click", LogoutUser);

  document.getElementById('vendorprofile').style.display = "none";

  let uname = document.getElementById('uname');
  let uemail = document.getElementById('uemail');
  let uproname = document.getElementById('uproname');
  let uproid = document.getElementById('uproid');
  let uquantity = document.getElementById('uquantity');
  let ulocation = document.getElementById('ulocation');
  let umessage = document.getElementById('umessage');

  // let accept = document.getElementById('accept').addEventListener("click", functionname);
  // let decline = document.getElementById('decline').addEventListener("click", functionname);


  function googleauth(){
    console.log("pressed");
    signInWithPopup(auth, provider)
    .then((result) => {
      document.getElementById('signinwithgoogle').style.display = "none";
      document.getElementById('vendorprofile').style.display = "block";
    }).catch((error) => {
        console.log(error);
    });
  }

  function checkAuthState() {
    onAuthStateChanged(auth, (user => {
        if (user) {
          document.getElementById('signinwithgoogle').style.display = "none";
          showvendorname(user);
          console.log(user)
        }
        else {

        }
    }));
  }
  checkAuthState();

  function showvendorname(user){
    document.getElementById('vendorname').innerHTML = `
      <h6>${user.displayName}</h6>
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

  async function starter(){
    const collectionRef  = collection(db, "Orders/");
    const cardconta = document.getElementById("cardconta");
    const querySnapshot = await getDocs(collectionRef);

    // console.log(querySnapshot);

    let cardsHtml = "";

    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().boolval}`);
      let ans = `${doc.data().boolval}`;
      let finalcard;
      console.log(ans);
      if(doc.data().boolval){
        cardsHtml += `
          <div class="ps-3">
            <h6 id="uname">${doc.data().name}</h6>
            <p id="uemail">${doc.data().email}</p>
            <span class="text-success small pt-1 fw-bold">Product Name</span> <span id="uproname" class="text-muted small pt-2 ps-1">${doc.data().productname}</span><br>
            <span class="text-success small pt-1 fw-bold">Product Id</span><span id="uproid" class="text-muted small pt-2 ps-1">${doc.data().productid}</span><br>
            <span class="text-success small pt-1 fw-bold">Quantity</span> <span id="uquantity" class="text-muted small pt-2 ps-1">${doc.data().quantity}</span><br>

            <p class="mt-3" id="ulocation">${doc.data().location}</p>

            <span class="text-success small pt-1 fw-bold">Message</span> <span id="umessage" class="text-muted small pt-2 ps-1">${doc.data().message}</span><br>

            <button id="accept" class="btn btn-success btn-sm m-3 ">Accept</button>&ensp;
            <button id="decline" class="btn btn-danger btn-sm m-3">Decline</button>
          </div>
        `;
      }
        if(ans === 'true')
          cardconta.innerHTML = cardsHtml;
        else
          cardconta.innerHTML = "";        
    
    });
  }
  starter();

  function LogoutUser() {
    console.log('logout');
    signOut(auth, provider).then(() => {
        document.getElementById('signinwithgoogle').style.display = "block";
        document.getElementById('vendorprofile').style.display = "none";
    }).catch(e => {
        console.log(e);
    })
  }

  
