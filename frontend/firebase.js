import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    onAuthStateChanged,
    connectAuthEmulator,
    signInWithEmailAndPassword, 
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
connectAuthEmulator(auth, "https://localhost:9099");

