import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore'
import {apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} from '@env'

import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

// Initialize Firebase
initializeApp(firebaseConfig)

//Connection to firestore
const firestore = getFirestore()

//collection name
const MESSAGES = 'messages'

export { 
    firestore,
    collection,
    addDoc,
    MESSAGES,
    serverTimestamp,
    getAuth,
    signInWithEmailAndPassword,
    onSnapshot,
    orderBy,
    query,
}
