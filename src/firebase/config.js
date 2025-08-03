// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCS4lxUbcSpwOtbYlj0pU84GJdROiIzjhY",
  authDomain: "tolet-poster.firebaseapp.com",
  projectId: "tolet-poster",
  storageBucket: "tolet-poster.firebasestorage.app",
  messagingSenderId: "880701453740",
  appId: "1:880701453740:web:918b17eac3535d94b0b609"
}; 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;     