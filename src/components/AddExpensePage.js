// Stateless functional component
import React from "react";
import ExpenseForm from "./ExpenseForm";
import {connect} from "react-redux";
import {addExpense} from "../actions/expenses";

// We pass a callback function down as a prop to the ExpenseForm
// Let me explain the JSX syntax.  We need curlies for JS within JSX
// onSubmit={some javascript}
// (expense) => {}  is simply a single line arrow function
const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit={(expense) => {
                console.log('Add Expense Page', props)
                console.log('Expense page received an expense from the expense form', expense)
                props.dispatch(addExpense(expense));
                /* This is how we redirect */
                props.history.push('/')
            }}
        />
    </div> )
const ConnectedAddExpensePage = connect()(AddExpensePage)
export default ConnectedAddExpensePage