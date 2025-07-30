// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyCDlXOcaBUFQ_9cK9L7X5tW_k6m46Q6KRY",
    authDomain: "parts-manufacturer.firebaseapp.com",
    projectId: "parts-manufacturer",
    storageBucket: "parts-manufacturer.appspot.com", 
    messagingSenderId: "796737479018",
    appId: "1:796737479018:web:8eb5c91f20c7b8bb660513"  
};   

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;    