// Stateless functional component
import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { addExpense } from "../actions/expenses";

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.saveExpense(expense);
    /* This is how we redirect */
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

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
