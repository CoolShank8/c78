import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyCXcoTB0PuB5GWoqaJ63mjUYfkJa3pbHJc",
    authDomain: "booksanta-f3dea.firebaseapp.com",
    projectId: "booksanta-f3dea",
    storageBucket: "booksanta-f3dea.appspot.com",
    messagingSenderId: "82516529765",
    appId: "1:82516529765:web:8f33c8a48d398ef6a1ec8c",
    measurementId: "G-DDT7DBMDR0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase