import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBrEnO9XBrGbU3DpV3tbSZnvwhtH9ckaLc",
    authDomain: "proyectofinal-1e52b.firebaseapp.com",
    projectId: "proyectofinal-1e52b",
    storageBucket: "proyectofinal-1e52b.firebasestorage.app",
    messagingSenderId: "294347366387",
    appId: "1:294347366387:web:de04e883f51d9bdb40fc86"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();