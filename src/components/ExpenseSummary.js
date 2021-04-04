import React from "react";
import { connect } from "react-redux";
import {getVisibleExpenses} from "../selectors/expenses";
import {getExpensesTotal} from '../selectors/expensesTotal'
import currencyAmount from "../utilities/currency";

export class ExpenseSummary extends React.Component {

  render() {
    return (
      <div>
        <h1>Summary</h1>
        <p>Viewing {this.props.expenseCount} {this.props.word} totalling {currencyAmount(this.props.totalAmount)}</p>
      </div>
    );
  }
}

// This is just a function that returns an object of the things we may want to use that are in
// our application's state
// Note: declare it before we need to use it
const mapStateToProps = (state) => {
  console.log("Expenses === ", state.expenses);
  let expenses = getVisibleExpenses(state.expenses, state.filters)
  return {
    expenseCount: expenses.length,
    totalAmount: getExpensesTotal(expenses),
    word: expenses.length === 1 ? 'expense' : 'expenses'
  };
};

// This does look like strange syntax, but it's simple really.
// connect() returns a function and we then call that function with our ExpenseSummary component
// just like we did with WrappedComponent in hoc.js
const ConnectedExpenseSummary = connect(mapStateToProps)(ExpenseSummary);

// Note that we now export the connected expense summary
export default ConnectedExpenseSummary;

