// Stateless functional component
import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { addExpense, removeExpense } from "../actions/expenses";
import { editExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    expense.id
      ? this.props.editExpense(expense)
      : this.props.addExpense(expense);
    this.props.history.push("/");
  };

  onClick = () => {
    console.log('Remove clicked')
    console.log(`REMOVE EXPENSE ${this.props.expense}`)
    this.props.removeExpense(this.props.expense);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>Edit Expense</h1>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onClick}>Remove</button>
      </div>
    );
  }
}

// We need to pass the id in from our class's props and get an expense object out of the store (aka the global state)
// If we then examine the props coming in, we will see that it has then been populated with the expense from the state
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      (expense) => expense.id === props.match.params.id
    ),
  };
};
// The three methods that do the actual dispatch of the generated actions are now in the props
// The component doesn't need to know about the dispatcher or the actions itself
// It can just use the callback functions in its props (which happen to have the same names as the action generators)
const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(removeExpense({ id: expense.id })),
  editExpense: (expense) => dispatch(editExpense(expense.id, expense)),
  addExpense: (expense) => dispatch(addExpense(expense)),
});
// connect to the store
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
