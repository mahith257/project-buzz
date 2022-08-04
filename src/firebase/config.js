import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB2g-xPamZX9A9m1gtQOvGVylSMYngZEp0",
    authDomain: "projectbuzz-9eb40.firebaseapp.com",
    projectId: "projectbuzz-9eb40",
    storageBucket: "projectbuzz-9eb40.appspot.com",
    messagingSenderId: "475322366103",
    appId: "1:475322366103:web:78dec3bcf02e7a79ae51d2"
};

// initialize firebase
firebase.initializeApp(firebaseConfig)

// initialize firestore
const projectFirestore = firebase.firestore()

// initialize authentication
const projectAuth = firebase.auth()

//initialize firebase storage
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export {projectFirestore, projectAuth, projectStorage, timestamp}
