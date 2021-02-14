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

## Links and Navlinks
https://reactrouter.com/web/api/Link
import from react-router-dom

Instead of using anchor tags for hyperlinks to pages in our app, we use Link and Navlink as this is client-side routing and avoids a 
full-page refresh.  e.g.

`<Link to="/">Go to the home page</Link>`

We would still use anchor tags for external urls as we cannot render these pages ourselves.

We created a simple header component with links to all the pages.  This was rendered on every page.
![image](https://user-images.githubusercontent.com/20191662/106807663-4d51cf00-6661-11eb-921b-29007535b44b.png)
We can use Navlink in exactly the same way and it's bahaviour would be identical.  So what's the point?
Well, it has additional features such as allowing us to style the active selected option to highlight which link we clicked.

A className of our choosing is assigned at runtime via `activeClassName="myclassname"` and we can then style that how ever we like.
 

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
# Notes
You can use the ...spread operator for arrays, but to use the ...spread operator for objects, you need to let Babel know via plugin babel-plugin-transform-object-rest-spread

# Creating an Action Generator
```$xslt
// It's a function
const editExpense = () => { return xxxxx }
// For a simple action generator, we want to implicitly return the response so we drop the {}
const editExpense = () => xxxxx
// The response will be an object, so we add the {} but don't forget the extra brackets
// It will have a type property, plus whatever else you need.  Remember to set a default if you need one
const editExpense = (something = 0) => ({
    type: 'EDIT_EXPENSE'
    something
})

// When using the generated action, you will have action.type and action.something
```
# Setting State By Function or Object
Use a function. Read this for why https://www.freecodecamp.org/news/functional-setstate-is-the-future-of-react-374f30401b6b/

```
const description = e.target.value
this.setState( () => ({ description }))
```

Passing an object like so will work, but don't do it

```
const description = e.target.value
this.setState({ description })
```

You can also use e.target.value directly, without an intermediate variable, but as it's a callback function, you will get React errors if you use e.target.value in a function that's mutating it.
So you need to persist it first

```
e.persist()
this.setState( () => ({ description: e.target.value }))
```

## Mapping State to Props
```$xslt
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) =>  expense.id === props.match.params.id )
  }
}

// connect to the store
export default connect(mapStateToProps)(EditExpensePage)
```

Explainer:  state is the store for the application.  We use connect() to connect a component to the store.
To get values out of the store and into the props for that component, we use `mapStateToProps(state, props)`
In the example above, we're populating `props.expense`
![image](https://user-images.githubusercontent.com/20191662/106956522-9de32e00-672e-11eb-8e36-183420e9471e.png)

But how did we get the expense id into the props for us to use in the find?

That was a param passed in from the router:
```$xslt
    <Route path="/edit/:id" component={ EditExpensePage }/>
```
So, we have props that have been pushed in from when the component was called and props that we have pulled in from the store.

# Regex
https://regex101.com/

Can use a regex in the string match() function - but enclose the regex in a pair of escape chars `/  /`

## Currency - 2 optional decimal places
`^\d*(\.)?(\d{0,2})?$`

`^`  starts with...

`\d*`  0 or more digits

`(\.)?`  optional group consisting of a dot

`(\d{0,2})?`  optional group consisting of 0 to 2 digits

`$` the end - no more characters

Or...
`^\d*(\.\d{0,2})?$` - Same as before but..

`(\.\d{0,2})?`  optional group consisting of a dot and of 0 to 2 digits 

To prevent a number like `.2` being accepted, we can change `*d` to `d{1,}` which means 1 to an-unspecified-number-of digits.
Alternatively `\d\d*` means a digit followed by 0 or more digits

# Moment.js

The project uses moment, but this is legacy now and should not be used in new projects.

https://momentjs.com/docs/#/-project-status/

# Redux Dev-Tools
Allows you to TODO
Add the Chrome extensiom - redux dev-tools extension
You need to add an argument when creating the store:
 window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 
 https://github.com/zalmoxisus/redux-devtools-extension
 
  

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

Lec 100/200 completed by => 23/01/2021
