import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyB70aEb503AWHQgw6Ms7uEDLw7JsG6ZPwM",
  authDomain: "flower-power-music.firebaseapp.com",
  projectId: "flower-power-music",
  storageBucket: "flower-power-music.appspot.com",
  messagingSenderId: "932050257762",
  appId: "1:932050257762:web:82d038f09d3022c415ce3b"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);


export default auth;