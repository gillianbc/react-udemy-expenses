import firebase from 'firebase';

const firebaseConfig = {
    // Your web app's Firebase configuration
    apiKey: "AIzaSyAGjKiK_Fgt-i78dqNITzTW1bc7tEmrVag",
    authDomain: "expensify-d8ec1.firebaseapp.com",
    databaseURL: "https://expensify-d8ec1-default-rtdb.firebaseio.com",
    projectId: "expensify-d8ec1",
    storageBucket: "expensify-d8ec1.appspot.com",
    messagingSenderId: "869266137378",
    appId: "1:869266137378:web:1e33058fcdc257de0d857b"
}

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export { firebase, db };

