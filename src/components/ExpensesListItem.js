import React from 'react'

export const ExpensesListItem = ({description, amount, createdAt}) => (
    <div>
        <p>Item: {description} £{amount} Created Date: {createdAt}</p>
    </div>
)