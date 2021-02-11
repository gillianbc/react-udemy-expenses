import React from 'react'
import {Link} from "react-router-dom";


const ExpenseListItem = ({ id, amount, description, createdAt }) => (
    <div>
        <p><Link to={"edit/" + id }>{description}</Link> £{amount} Created Date: {createdAt}</p>
    </div>
)

export default ExpenseListItem