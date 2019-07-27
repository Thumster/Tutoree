import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDVScOjOKGbRD_ruKiZj4sMI94Xlrdk5JI",
    authDomain: "tutoree-52fe1.firebaseapp.com",
    databaseURL: "https://tutoree-52fe1.firebaseio.com",
    projectId: "tutoree-52fe1",
    storageBucket: "",
    messagingSenderId: "828249713487",
    appId: "1:828249713487:web:4b8fc1030788f73c"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.firestore().settings({timestampsInSnapshots: true});
  
  export default firebase;