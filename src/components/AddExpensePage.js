// Stateless functional component
import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { addExpense } from "../actions/expenses";

// We pass a callback function down as a prop to the ExpenseForm
// Let me explain the JSX syntax.  We need curlies for JS within JSX
// onSubmit={some javascript}
// (expense) => {}  is simply a single line arrow function
export const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={(expense) => {
        console.log("Add Expense Page", props);
        console.log(
          "Add Expense page received an expense from the expense form",
          expense
        );
        props.saveExpense(expense);
        /* This is how we redirect */
        props.history.push("/");
      }}
    />
  </div>
);

// If we pass no args to connect(), then the ExpenseListItem will receive dispatch from the store by default
// const ConnectedAddExpensePage = connect()(AddExpensePage);
// However, defining our dispatch in props makes it easier to test with spies etc
// It also means that the AddExpensePage doesn't need to concern itself with dispatch
const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expense) => dispatch(addExpense(expense)),
});
const ConnectedAddExpensePage = connect(
  undefined,
  mapDispatchToProps
)(AddExpensePage);

export default ConnectedAddExpensePage;
