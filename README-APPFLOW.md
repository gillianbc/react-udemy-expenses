# Application Flow
Explains the application flow up to the end of Lecture 108.

## Starting the app
package.json has script dev-server which launches webpack.
Webpack has the entry point as app.js

## app.js
app.js imports the configured store, defines the Provider and the App Router, 
dispatches a few add requests to the store.

### configureStore
combines the reducers for:
- expenses
- filters

(The reducers are equivalent to graphql resolvers)

#### expense reducer
Defines the default state of the expenses as an empty []
Defines the what to do with the state, i.e. the array of expenses, in response to each action.type 
e.g. action.type = 'ADD_EXPENSE' then it returns a new array made from all the rows currently in the array plus the new row from the payload

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

## AppRouter
AppRouter declares the BrowserRouter i.e. our available 'pages'.  
(They're not pages - we have one page whose content gets rerendered depending on which 'page' we pick).
The Header is always rendered.  There's a switch statement defining the urls for our AddExpensePage component, EditExpensePage component etc

## Header
Returns the JSX for rendering the NavLinks for our routes  e.g. the root "/" is for the ExpenseDashboardPage

##ExpenseDashboardPage - path="/"
ExpenseDashboardPage is a stateless functional component of:
<ExpenseListFilters> - sort and filter options
<MyExpenses> - the list of expenses (aka ExpenseList)

## ExpenseListFilters
Connected to the store
Gets the filters from the state and maps to its props
Renders inputs allowing you to:

- choose the sort by date or amount
  
- filter by a text value

Dispatches the selected value to the state via dispatch actions available in the props
Note:  it doesn't do any filtering of the expenses, it's just setting filter properties

## ExpenseList
Connected to the store.
__mapStateToProps__
- populates sorted and filtered **props.expenses** via state.expenses and state.filters via *selector* function getVisibleExpenses()
- populates **props.filters** from state.filters

For each expense in its props, it renders an `<ExpenseListItem>` passing in the expense.id as the key and all the fields from the expense

### expenses selectors
Just ordinary functions that are supplied with the list of expenses and return a sorted and filtered list of expenses 

## Expense List Item
Connected to the store - there is no mapStateToProps, but it does destructure `dispatch` from the props.  
`dispatch` is always available in the props for a connected component.
Also destructures the id, amount, description and createdAt which it has received from <ExpenseList>
Renders 
- the received expense
- a link to the edit route using id

## EditExpensePage - path="/edit/:id"
Connected to the store.
__mapStateToProps__
The route url will have passed the id to the props as a param i.e. props.match.params.id
This id is then used to find the matching row of the state.expenses and populate the **props.expense**

Renders <ExpenseForm> and passes in props of:
- expense
- onSubmit - a callback function 
and also renders a remove button that will dispatch the action returned by function removeExpense(id)

The onSubmit() function will dispatch either:
- the action returned by function editExpense(expense.id, expense)
- the action returned by function startAddExpense(expense)
(dependent on whether or not there's an expense.id)

After dispatching the action, the root page (dashboard) is re-rendered via props.history.push('/')

## AddExpensePage - path="/create"
Connected to the store.  
We need dispatch, which we're given in the props as a freebie, but we don't need anything else from the store, so there's no mapStateToProps().

Renders <ExpenseForm> and passes in props of:
- onSubmit - a callback function 

The onSubmit() function will dispatch:
- the action returned by function addExpense(expense)
After dispatching the action, the root page (dashboard) is re-rendered via props.history.push('/')

## ExpenseForm
Used by both the EditExpensePage and the AddExpensePage.
Class-based component that inherits from React-component.  
Its render() method provides an html form with all the input fields for adding/editing an expense plus a submit button.  
The onSubmit() callback function will be called when the form is submitted via the submit button.
The constructor sets the state object to the fields required for an expense, using defaults if no expense was passed in.
Defines event handlers for the form field events.

## expenses actions
A set of functions that return actions for expenses.  e.g. the addExpense() function will return an object with type: 'ADD_EXPENSE' 
and an expense: object constructed from the args passed in. 

## filters actions
A set of functions that return actions for filters.  e.g. the sortByAmount() function will simply return an object with type: 'SORT_BY_AMOUNT'.

## Observations
The only class based react component. we have at this point is the ExpenseForm 
i.e. direct render() method and we need to manages its state.  
The other parts are just stateless functional components that return some JSX.
We also have the `<BrowserRouter>` which conditionally renders content based on the selected path.

# Thunk - Redux Async via Function
From lecture 152, we need to talk to the firebase database as well as interacting with our redux store.
Not explained very well in the course - the docs are better:
https://redux.js.org/tutorials/fundamentals/part-6-async-logic

We use middleware as dispatch cannot be async. 
Before Thunk:  
    - dispatch some action to affect the store

With Thunk:
    - async function to interact with database
    - then dispatch some action to affect the store