// Stateless functional component
import React from "react";
import MyExpenses from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpenseSummary from "./ExpenseSummary";

const ExpenseDashboardPage = () => (
    <div>
        <ExpenseListFilters />
        <p>Nothing shown?  Check the date range</p>
        <ExpenseSummary />
        <MyExpenses />
    </div> )

export default ExpenseDashboardPage