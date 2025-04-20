  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth,
           createUserWithEmailAndPassword,
           signInWithEmailAndPassword,
           onAuthStateChanged,
           signOut
        } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
        import { getFirestore, addDoc ,collection} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDhCIDt8oe9weIKsm8GSLSuJqbulrohkqY",
    authDomain: "smit-proj-ad066.firebaseapp.com",
    projectId: "smit-proj-ad066",
    storageBucket: "smit-proj-ad066.firebasestorage.app",
    messagingSenderId: "257600330161",
    appId: "1:257600330161:web:c025c29f8a286e8cc38590",
    measurementId: "G-6QZ0LP623M"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  function handlesignup(){
    const email = document.getElementById('s-email').value
    const password = document.getElementById('s-pass').value

    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
        title: "Your Account Has Been Created!!!",
        text: `${user.email}`,
        icon: "success"
      }).then(() => {
        location.href = "./login.html";
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Credentials",
      });
  });
  }
window.handlesignup = handlesignup;


async function handlelogin() {
    const email = document.getElementById("l-email").value;
    const password = document.getElementById("l-pass").value;
    try {
      const docRef = await addDoc(collection(db, "Iteams"), {
        Email: email.value,
        Password: password.value,
      });
      console.log("Document written with ID: ", docRef.id);
      email.value = "";
      password.value = "";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
          title: "User Logged In Successfully",
          text: `${user.email}`,
          icon: "success",
        }).then(() => {
          location.href = "./dashboard.html";
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops ...",
          text: "Invalid Credentials",
        });
      });
  }
  window.handlelogin = handlelogin;


//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       if (
//         location.pathname.endsWith("Signup.html") ||
//         location.pathname.endsWith("login.html")
//       ) {
//         location.href = "./dashboard.html";
//       }
//     } else {
//       if (location.pathname.endsWith("dashboard.html")) {
//         location.href = "./login.html";
//       }
//     }
//   });


  function logoutUser() {
    signOut(auth)
      .then(() => {
        Swal.fire({
          title: "User Logged Out Successfully",
          text: `Byee Byee`,
          icon: "success",
        }).then(() => {
          window.location.href = "./login.html";
        });
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        Swal.fire({
          icon: "error",
          title: "Oops ...",
          text: "Something Went Wrong Try Again",
        });
      });
  }
  window.logoutUser = logoutUser;

  