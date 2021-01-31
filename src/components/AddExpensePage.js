// Stateless functional component
import React from "react";
import ExpenseForm from "./ExpenseForm";
import store from "../store/configureStore";
import {addExpense} from "../actions/expenses";

// We pass a callback function down as a prop to the ExpenseForm
// Let me explain the JSX syntax.  We need curlies for JS within JSX
// onSubmit={some javascript}
// (expense) => {}  is simply a single line arrow function
const AddExpensePage = () => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit={(expense) => {
                console.log('Expense page received an expense from the expense form', expense)
                store.dispatch(addExpense(expense));
            }}
        />
    </div> )

export default AddExpensePage