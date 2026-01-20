import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDynfhF9d9xIrgHbp2edQaoBtoXSeoKXpM",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "arhum-prototype-db.firebaseapp.com",
    databaseURL: "https://arhum-prototype-db-default-rtdb.firebaseio.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "arhum-prototype-db",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "arhum-prototype-db.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1092494349839",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1092494349839:web:56764befeef51fef15b57a"
};

// const firebaseConfigKeys = {
//     apiKey: "AIzaSyDynfhF9d9xIrgHbp2edQaoBtoXSeoKXpM",
//     authDomain: "arhum-prototype-db.firebaseapp.com",
//     databaseURL: "https://arhum-prototype-db-default-rtdb.firebaseio.com",
//     projectId: "arhum-prototype-db",
//     storageBucket: "arhum-prototype-db.firebasestorage.app",
//     messagingSenderId: "1092494349839",
//     appId: "1:1092494349839:web:56764befeef51fef15b57a",
//     measurementId: "G-D4LH14FNTL"
// };

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

export { auth, db, rtdb };
