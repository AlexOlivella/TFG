import Firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyATg5tYxvnncnmYK_VCdIA_SQlbiY_ENyE",
    authDomain: "react-firebase-80e36.firebaseapp.com",
    databaseURL: "https://react-firebase-80e36.firebaseio.com",
    projectId: "react-firebase-80e36",
    storageBucket: "",
  };
  // Initialize Firebase
let app = Firebase.initializeApp(config);
export const db = app.database();