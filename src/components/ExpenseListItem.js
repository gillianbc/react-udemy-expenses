import React from 'react'
import {connect} from "react-redux";
import {removeExpense} from "../actions/expenses";
import {Link} from "react-router-dom";


const ExpenseListItem = ({ dispatch, id, amount, description, createdAt }) => (
    <div>
        <p><Link to={"edit/" + id }>{description}</Link> £{amount} Created Date: {createdAt}</p>
        <button onClick={() => {
            dispatch(removeExpense({id}))
        }}>Remove</button>
    </div>
)

// If we pass no args to connect(), then the ExpenseListItem will receive dispatch from the store by default
const ConnectedExpenseListItem = connect()(ExpenseListItem)

export default ConnectedExpenseListItem