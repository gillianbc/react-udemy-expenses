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

// Firebase can't handle arrays.  Instead, we use push.
// Firebase will create a unique property name
// for each object that we push.  We can then use that property for
// subsequent fetch / update /delete

const expenses = [
    {
        description: 'apple',
        amount: 137,
        note: 'Green and juicy',
        createdAt: 182918
    },
    {
        description: 'banana',
        amount: 1327,
        note: 'Yellow',
        createdAt: 182917
    },
    {
        description: 'pear',
        amount: 177,
        note: 'Green and sweet',
        createdAt: 182919
    }
]

// Push individual elements of an array
expenses.map((expense) => {
    db.ref('expenses').push(expense)
        .then((result) => {
            console.log('PUSHED expense', result)
        })
        .catch((err) => {
            console.log('PUSH error', err)
        })
})

//Subscription that fires when a child element is removed
db.ref('expenses').on('child_removed', snapshot => {
   // Log the key (parent element), log the value at the 'expenses' location i.e. an expense
    console.log('REMOVED', snapshot.key, snapshot.val())
})

// Push an array of expenses - firebase will create an index for each, starting at 0
// The indexes are not helpful to us - we need the expense id to be our key, so we won't
// use this method for pushing multiple items
/*
db.ref('badexpenses').push(expenses)
    .then((result) => {
        console.log('PUSHED expenses', result)
    })
    .catch((err) => {
        console.log('PUSH error', err)
    })

// Get the key of each expense on firebase
// Fetch the expenses, use forEach to loop thro the children,
// use the child's key as the id
const processData = () => {
    return snapshot => {
        console.log('PROCESSING', snapshot.val())
        const retrievedExpenses = [];
        snapshot.forEach(childSnapshot => {
            console.log('PROCESSING ITEM')
            retrievedExpenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            })
        })
        console.log('RETRIEVED EXPENSES:', retrievedExpenses)
    };
}

// Get keys created by firebase
// store results in a new array
db.ref('expenses')
    .once('value')
    .then(processData())

// Subscription to monitor changes to remote expenses
// 'value' is the eventType - might have been better named as 'valueChanged'
db.ref('expenses')
    .on('value',  processData())

*/

//Test the connectiion by sending in some arbitrary data.
// ref() will store the data at the root
/*db.ref().set({
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
})*/

// Read data once - root data i.e. everything
/*db.ref().get().then(function(rootSnapshot) {
    if (rootSnapshot.exists()) {
        console.log('ROOT', rootSnapshot.val());
    }
    else {
        console.log("No data available");
    }
}).catch(function(error) {
    console.error(error);
});*/

// Read data when it or it's children change
/*let addressWatch = db.ref('location');
addressWatch.on('value', (snapshot) => {
    console.log('ADDRESS', snapshot.val());
});*/

/*db.ref().update({'location/country': 'Greece'})
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
    })*/


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

