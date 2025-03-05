import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword, 
    signOut,
    sendEmailVerification,
} from 'firebase/auth';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDjr6ks75nLF4KX1uUIkBnySWxz0wVqfAs",
    authDomain: "urlshortener-eb131.firebaseapp.com",
    projectId: "urlshortener-eb131",
    storageBucket: "urlshortener-eb131.firebasestorage.app",
    messagingSenderId: "170765092469",
    appId: "1:170765092469:web:275d6f6d913d550effda3c",
    measurementId: "G-HEPYKNNCV1"
}); // This must be first before any service function

const auth = getAuth(firebaseApp);
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    if (loginButton) {
        loginButton.addEventListener("click", (event) => {
            event.preventDefault(); 
            loginEmailPassword();
        });
    }

    const signupButton = document.getElementById("signupButton");
    if(signupButton){
        signupButton.addEventListener("click", (event) => {
            event.preventDefault();
            createAccount();
        });
    }

    const logoutButton = document.getElementById("logoutButton");
    if(logoutButton){
        logoutButton.addEventListener("click", (event) => {
            event.preventDefault();
            logout();
        });
    }
});

const loginEmailPassword = async () => {
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPass").value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        const user = userCredential.user;

        if (!user.emailVerified) {
            alert("Please verify your email before logging in.");
            await signOut(auth);
            return;
        }else{
            console.log("User logged in:", user);
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
        alert("Login Error: " + error.message);
    }
};


const createAccount = async () => {
    const signupEmail = document.getElementById("signupEmail").value.trim();
    const confirmEmail = document.getElementById("confirmEmail").value.trim();
    const signupPassword = document.getElementById("signupPass").value;
    if(signupEmail==confirmEmail){
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
            console.log("User Created:", userCredential.user);

            await sendEmailVerification(userCredential.user);
            alert("Verification email sent! Please check your inbox before logging in.");
            await signOut(auth);
            window.location.replace("login.html"); 

            console.log("User Created (Verification Pending):", user);
        } catch (error) {
            console.error("Error Creating User:", error.message);
        }
    }else{
        alert("Emails do not match!");
    }
}

const logout = async () => {
    await signOut(auth);
}

let firstLoad = true; 
const monitorAuthState = () => {
    onAuthStateChanged(auth, (user) => {
        console.log("Auth state changed:", user);

        const currentPage = window.location.pathname.split("/").pop();
        
        if (user) {
            console.log("User is logged in:", user);

            if (!user.emailVerified) {
                signOut(auth);
                return;
            }

            if (currentPage !== "index.html") {
                if (!firstLoad) alert("You have logged in!");
                window.location.replace("index.html"); 
            }
        } else {
            console.log("User is logged out.");

            if (currentPage !== "login.html") {
                if (!firstLoad) alert("You have logged out!");
                window.location.replace("login.html");
            }
        }

        firstLoad = false; 
    });
};

monitorAuthState();


