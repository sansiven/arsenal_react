import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2xIl9IwhujiVYuD8xQIlK4JiswOi9aJ8",
    authDomain: "arsenal-react.firebaseapp.com",
    databaseURL: "https://arsenal-react.firebaseio.com",
    projectId: "arsenal-react",
    storageBucket: "arsenal-react.appspot.com",
    messagingSenderId: "779907770244",
    appId: "1:779907770244:web:0ab5564a6e8187dd3e9fd1"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseDB,
    firebaseTeams,
    firebasePlayers
}