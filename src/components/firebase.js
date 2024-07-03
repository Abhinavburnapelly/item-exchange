// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFZXzh1gswHiJpUeJP2uPtrKnVX6EJfkM",
    authDomain: "itemexchange-b4260.firebaseapp.com",
    databaseURL: "https://itemexchange-b4260-default-rtdb.firebaseio.com",
    projectId: "itemexchange-b4260",
    storageBucket: "itemexchange-b4260.appspot.com",
    messagingSenderId: "591548891399",
    appId: "1:591548891399:web:e8feaa1cc7a9c49fbc45a2",
    measurementId: "G-0GGPCJLXC6"
  };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth(app);


export { database,auth }; 
