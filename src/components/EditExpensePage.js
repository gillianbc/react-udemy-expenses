// Stateless functional component
import React from "react";
import {connect} from 'react-redux';
import ExpenseForm from "./ExpenseForm";
import {addExpense} from "../actions/expenses";
import {editExpense} from "../actions/expenses";

const EditExpensePage = (props) => (
    <div>
      <h1>Edit Expense</h1>
      <ExpenseForm
          expense={props.expense}
          onSubmit={(expense) => {
              console.log('Props expense', props.expense)
            console.log('Edit Expense Page - id is ', expense.id)
            console.log('Edit Expense page received an expense from the expense form', expense)
            expense.id ? props.dispatch(editExpense(expense.id, expense)) : props.dispatch(addExpense(expense))
            /* This is how we redirect */
            props.history.push('/')
          }}
      />
    </div> )

// We need to pass the id in from our class's props and get an expense object out of the store (aka the global state)
// If we then examine the props coming in, we will see that it has then been populated with the expense from the state
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) =>  expense.id === props.match.params.id )
  }
}

// connect to the store
export default connect(mapStateToProps)(EditExpensePage)