import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyATg5tYxvnncnmYK_VCdIA_SQlbiY_ENyE",
  authDomain: "react-firebase-80e36.firebaseapp.com",
  databaseURL: "https://react-firebase-80e36.firebaseio.com",
  projectId: "react-firebase-80e36",
  storageBucket: "react-firebase-80e36.appspot.com",
  messagingSenderId: "690750967581",
  appId: "1:690750967581:web:ff574175ddaa6ea9409bf4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;