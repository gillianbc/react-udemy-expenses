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

//Test the connectiion by sending in some arbitrary data.
// ref() will store the data at the root

const db = firebase.database();

db.ref().set({
    name: 'Gillian BC',
    age: 55,
    location: {
        building: 'My house',
        country: 'UK'
    },
    isDeveloper: true
}).then( () => {
    console.log('FIREBASE data saved')
}).catch( (e) => {
    console.log('FIREBASE save rejected', e)
})
//Using set to remove data
db.ref('isDeveloper').set(null);


/*const devref = firebase.database().ref('isDeveloper');
devref.remove()
    .then(() => {
        console.log("FIREBASE Remove succeeded.")
    })
    .catch((error) => {
        console.log("FIREBASE Remove failed: " + error.message)
    });*/

/*db.ref('attributes').set({
    height: '5 foot  6',
    weight: '12 stones'
})

db.ref('age').set(56);
db.ref('location/country').set('France')
db.ref('location/street').set('The Lane')*/

