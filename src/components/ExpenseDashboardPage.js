// Stateless functional component
import React from "react";
import MyExpenses from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";

const ExpenseDashboardPage = () => (
    <div>
        <ExpenseListFilters />
        <MyExpenses />
    </div> )

export default ExpenseDashboardPage