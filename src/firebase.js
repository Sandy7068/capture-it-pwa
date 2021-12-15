import firebase from 'firebase';
import 'firebase/firestore'



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCx2l8V5siDaWmk9-AknQz-5CuwE3NaPRE",
    authDomain: "capture-it-8910d.firebaseapp.com",
    databaseURL: "https://capture-it-8910d-default-rtdb.firebaseio.com",
    projectId: "capture-it-8910d",
    storageBucket: "capture-it-8910d.appspot.com",
    messagingSenderId: "372253082718",
    appId: "1:372253082718:web:c2f455b2c234232c5ce0cf",
    measurementId: "G-XGFMVGZQET"
  };


  firebase.initializeApp(firebaseConfig);

  export default firebase;