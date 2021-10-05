import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBnSUFKp_b6pXdzwtIUuI2W-p-Kz3tH_tc",
    authDomain: "typethai-bf26c.firebaseapp.com",
    projectId: "typethai-bf26c",
    storageBucket: "typethai-bf26c.appspot.com",
    messagingSenderId: "219321509733",
    appId: "1:219321509733:web:d3915dbac3fd01e34fe38c"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire