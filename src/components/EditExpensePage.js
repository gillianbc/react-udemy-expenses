// Stateless functional component
import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense, removeExpense } from "../actions/expenses";
import { editExpense } from "../actions/expenses";

const EditExpensePage = (props) => (
  <div>
    <h1>Edit Expense</h1>
    <ExpenseForm
      expense={props.expense}
      onSubmit={(expense) => {
        expense.id
          ? props.dispatch(editExpense(expense.id, expense))
          : props.dispatch(addExpense(expense));
        /* This is how we redirect.  history is always part of the props */
        props.history.push("/");
      }}
    />
    <button
      onClick={() => {
        props.dispatch(removeExpense({ id: props.expense.id }));
        props.history.push("/");
      }}
    >
      Remove
    </button>
  </div>
);

// We need to pass the id in from our class's props and get an expense object out of the store (aka the global state)
// If we then examine the props coming in, we will see that it has then been populated with the expense from the state
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      (expense) => expense.id === props.match.params.id
    ),
  };
};

// connect to the store
export default connect(mapStateToProps)(EditExpensePage);
