import {v1 as uuid} from "uuid";
// ADD EXPENSE - action generator function
// Remember, () must surround an implicitly returned object
// The arg passed in will be the expense object
// We set a default for the arg passed in of {}
// For each property we destructure, we set its default
export const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

export const removeExpense = ( { id }) => ({
    type: 'REMOVE_EXPENSE',
    id
})

export const editExpense = (id, updateData ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updateData
})