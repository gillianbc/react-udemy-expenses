import React from 'react'
import {connect} from "react-redux";
import {removeExpense} from "../actions/expenses";


const ExpenseListItem = ({ dispatch, amount, description, createdAt }) => (
    <div>
        <p>Item: {description} £{amount} Created Date: {createdAt}</p>
        <button onClick={() => {
            dispatch(removeExpense({id}))
        }}>Remove</button>
    </div>
)

const ConnectedExpenseListItem = connect()(ExpenseListItem)

export default ConnectedExpenseListItem