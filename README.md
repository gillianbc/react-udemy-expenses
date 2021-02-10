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

# Application Flow

## Starting the app
Webpack has the entry point as app.js

## app.js
app.js imports the configured store, defines the Provider and the App Router, dispatches a few add requests to the store.

### configureStore
combines the reducers for:
- expenses
- filters

(The reducers are equivalent to graphql resolvers)

#### expense reducer
Defines the default state of the expenses as an empty []
Defines the what to do with the state, i.e. the array of expenses, in response to each action.type 
e.g. action.type = 'ADD_EXPENSE' then TODO

#### filters reducer
Defines the default state of the filters as:
```$xslt
text: '',
sortBy: 'date',
startDate: undefined,
endDate: undefined
```
Defines the what to do with the state, i.e. the set of filters, in response to each action.type 
e.g. action.type = 'SET_TEXT_FILTER' then sets the value of the property text to the payload value
Note:  it doesn't do any filtering of the expenses, it's just setting filter properties

## App Router
AppRouter declares the BrowserRouter i.e. our available 'pages'.  (They're not pages - we have one page whose content get rerendered depending on which 'page' we pick).
The Header is always rendered.  There's a switch statement for the urls of our create page, edit page etc

##Dashboard Page - url / 
ExpenseDashboardPage is a stateless functional component of:
<ExpenseListFilters> - sort and filter options
<MyExpenses> - the list of expenses (aka ExpenseList)

## ExpenseListFilters
Connected to the store
Gets the filters from the state and maps to its props
Renders inputs allowing you to 
- choose the sort by date or amount
- filter by a text value
Dispatches the selected value to the state via dispatch actions available in the props
Note:  it doesn't do any filtering of the expenses, it's just setting filter properties

## Expense List
Connected to the store.
__mapStateToProps__
- populates sorted and filtered **props.expenses** via state.expenses and state.filters via function getVisibleExpenses()
- populates **props.filters** from state.filters

For each expense in its props, it renders an <ExpenseListItem> passing in the expense.id as the key and all the fields from the expense

## Expense List Item
Connected to the store - there is no mapStateToProps, but it does destructure `dispatch` from the props.  
`dispatch` is always available in the props for a connected component.
Also destructures the id, amount, description and createdAt which it has received from <ExpenseList>
Renders 
- the received expense
- a remove button that will dispatch the action returned by function removeExpense(id)
- a link to the edit route using id

## Edit Expense Page
Connected to the store.
__mapStateToProps__
The route url will have passed the id to the props as a param i.e. props.match.params.id
This id is then used to find the matching row of the state.expenses and populate the **props.expense**

Renders <ExpenseForm> and passes in props of:
- expense
- onSubmit - a callback function 

The onSubmit() function will dispatch either:
- the action returned by function editExpense(expense.id, expense)
- the action returned by function addExpense(expense)
(dependent on whether or not there's an expense.id)

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
