# Firebase Database

Google no-sql database

Created a new project here:  www.firebase.google.com

https://console.firebase.google.com/project/expensify-d8ec1/overview

Use a Realtime database

https://console.firebase.google.com/project/expensify-d8ec1/database/expensify-d8ec1-default-rtdb/rules

On the rules page, initially we switch of authentication so that we can play.
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
Back at the project overview, we need to connect Firebase to our webapp.

`npm install firebase`

The config is provided from the firebase overview page https://console.firebase.google.com/project/expensify-d8ec1/overview
when you `add firebase to your webapp`

For now, we import firebase.js in app.js so we can check it is connecting correctly when we run the expensify app.
```
//Test the connectiion by sending in some arbitrary data.
// ref() will store the data at the root
firebase.database().ref().set({
    name: 'Gillian BC',
    age: 55,
    location: {
        building: 'My house',
        country: 'UK'
    },
    isDeveloper: true
})
```
You can see the data here:  https://console.firebase.google.com/project/expensify-d8ec1/database/expensify-d8ec1-default-rtdb/data

set() does not need an object, though an object does make more sense
It's a blunt instrument - very easy to overwrite EVERYTHING at the root.
So, use a named reference point e.g. the age ref :
```
db.ref('age').set(56);
db.ref('location/country').set('France')  // update - ref exists
db.ref('location/street').set('The Lane') // insert - ref does not exist
```

