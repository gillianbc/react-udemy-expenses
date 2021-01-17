# Part 2 of React Udemy Course
https://www.udemy.com/course/react-2nd-edition
Tutor: Andrew Mead

# Running the App
npm install

npm run dev-server

localhost:8080

## Client-Side Routing
![image](https://user-images.githubusercontent.com/20191662/104244536-8039e600-545a-11eb-831f-6329bf53e7cb.png)

To enable React to handle our routing rather than server-side routing, we have to tell it to serve up index.html for all pages or we'll get a 404.
We do that in webpack-config.js via `historyApiFallback`
```
devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
}
```
# Redux
Better way of managing state.  Just set the webpack entry point in webpack.config.js to /src/playground/redux101.js to try it out.
As usual, localhost:8080, but F12 view the console

# Actions and Reducers
The action is an object that invokes a change in state.
The reducer is a pure function that implements the change in state based on:
- the action passed in
- the previous state

*Pure*
- does not need any info other than that passed in
- does not mutate anything external, just returns something

Do not mutate the state or the action.  Just read from them and return a new object that represents the current state.
For an array, don't use `state.push(something)` use `state.concat(something)` which will return a new array

IMHO, the reducer is similar to a resolver in graphql and the actions are like the queries and mutations defined in the schema.

# Examples of Destructuring

```$xslt
//STEP1 - payload is an object (an empty object if none passed in)
const incrementCount = (payload = {}) => ({
    type: 'INCREMENT',
    incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
})
//STEP2 - destructure incrementBy
const incrementCount = ({ incrementBy }) => ({
    type: 'INCREMENT',
    incrementBy: typeof incrementBy === 'number' ? incrementBy : 1
})
//STEP 3 - set a default of 1 (actually, we're no longer checking for a numeric here)
const incrementCount = ({ incrementBy = 1 }) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy
})
//STEP 4 - object shorthand
const incrementCount = ({ incrementBy = 1 }) => ({
    type: 'INCREMENT',
    incrementBy
})
```

# Progress
Started:  29-11-2020

Lec 10/200 completed by => 30/11/2020

Lec 20/200 completed by => 19/12/2020

Lec 30/200 completed by => 30/12/2020

Lec 40/200 completed by => 31/12/2020

Lec 50/200 completed by => 02/01/2021

Lec 60/200 completed by => 04/01/2021

Lec 70/200 completed by => 09/01/2021

Lec 80/200 completed by => 12/01/2021

Lec 90/200 completed by => 16/01/2021

Lec 100/200 completed by =>
