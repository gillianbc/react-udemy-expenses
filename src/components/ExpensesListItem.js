import React from 'react'

export const ExpensesListItem = ({description, amount, createdAt}) => {
    return <div>
        <p>Item: {description} £{amount} Created Date: {createdAt}</p>
    </div>
}