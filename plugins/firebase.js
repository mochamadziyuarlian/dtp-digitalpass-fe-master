import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const app = require('~/app.json');
const config = app.config[process.env.ENV || 'development'];

initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
});

const db = getFirestore();

export {
    db
}
