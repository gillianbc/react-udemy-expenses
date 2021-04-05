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
Back at the project overview, we need to connect Firebase tou our webapp.

`npm install firebase`

The config is provided from the firebase overview page https://console.firebase.google.com/project/expensify-d8ec1/overview
when you `add firebase to your webapp`

For now, we import firebase.js in app.js so we can check it is connecting correctly.
