import React from 'react'
import {connect} from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import {getVisibleExpenses} from "../selectors/expenses";

const ExpenseList = (props) => (
    <div>
        <h1>This is my Expense List</h1>
        <p>My name is {props.gillian}</p>
        <p>The text filter from the state is: {props.filters.text}</p>
        {props.expenses.map((expense) => {
            // When we map the array of expenses, each row is an object
            console.log('Processing in map', expense)
            // Send across an object consisting of each field of the expense object
             return <ExpenseListItem key={expense.id} {...expense}/>
            // The above sends across key and each items of expense to props (or whatever we decide to call the args object)
            // { id: "jskldjkla", amount: 1888 } etc
            // We can then destructure
            // Note that key is not one of the ordinary props - it's a special keyword for React to use for array row handling
            // Alternately, I could have done:
            // return <ExpenseListItem key={expense.id} expense={expense}/>
            // The above sends across
            // { expense: {id: "jskldjkla", amount: 1888 } } etc
            // Alternately, I could have done this which is the preferred form when only a few properties as it's
            // explicit and you only pass what you need:
            //return <ExpenseListItem key={expense.id}  amount={expense.amount} description={expense.description}/>
            // Remember that the {} here are not object brackets, they are so we can write JS within the JSX
        })}
    </div>
)

// This is just a function that returns an object of the things we may want to use that are in our application's state
// Note: declare it before we need to use it
const mapStateToProps = (state) => {
    console.log('Expenses === ', state.expenses)
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters),
        gillian: 'Mrs Bladen-Clark',
        filters: state.filters
    }
}

// This does look like strange syntax, but it's simple really.
// connect() returns a function and we then call that function with our ExpenseList component
// just like we did with WrappedComponent in hoc.js
const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList)

// Note that we now export the connected expense list
export default ConnectedExpenseList;