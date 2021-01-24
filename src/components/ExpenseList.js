import React from 'react'
import {connect} from "react-redux";
import {ExpensesListItem} from "./ExpensesListItem";
import {getVisibleExpenses} from "../selectors/expenses";

const ExpenseList = (props) => (
    <div>
        <h1>This is my Expense List</h1>
        <p>My name is {props.gillian}</p>
        <p>{props.expenses[0].amount}</p>
        <p>The text filter from the state is: {props.filters.text}</p>
        {props.expenses.map((expense) => {
            // When we map the array of expenses, each row is an object
            console.log('Processing in map', expense)
            //Send across an object consisting of each field of the expense object
            return <ExpensesListItem key={expense.id} {...expense}/>
        })}
    </div>
)

// This is just a function that returns an object of the things we may want to use
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