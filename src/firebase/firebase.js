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

// Read data once - root data i.e. everything
db.ref().get().then(function(rootSnapshot) {
    if (rootSnapshot.exists()) {
        console.log('ROOT', rootSnapshot.val());
    }
    else {
        console.log("No data available");
    }
}).catch(function(error) {
    console.error(error);
});

// Read data when it or it's children change
let addressWatch = db.ref('location');
addressWatch.on('value', (snapshot) => {
    console.log('ADDRESS', snapshot.val());
});

db.ref().update({'location/country': 'Greece'})
    .then(() => {
        db.ref().update({'location/street': 'Park Lane'})
    })
    .then(() => {
        db.ref().update({'location/phone': '1727771'})
    })
    .then(() => {
        //Turn off the subscription
        addressWatch.off()
    })
    .then(() => {
        //We shouldn't see a log of this change
        db.ref().update({'location/street': 'Golders Lane'})
    })


//Using set to remove data
//db.ref('isDeveloper').set(null);

// Has to be an object when updating
// Update can add new refs and remove existing refs, but be careful if you update a ref that has
// children as it will replace that entire ref e.g. location in this example
/*db.ref().update({
    name: 'Mrs Bladen-Clark',
    age: 21,
    job: 'Software Developer',
    isDeveloper: null,
    location: {
        country: 'Greece'
    }
})*/
// To update only the country within location, we use a path, but we have to enclose the key in ''
// to escape the / in the path
/*db.ref().update({
    name: 'Mrs Bladen-Clark',
    age: 21,
    job: 'Software Developer',
    isDeveloper: null,
    'location/country': 'Greece'
})*/

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

