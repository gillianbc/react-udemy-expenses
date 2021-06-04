import {v1 as uuid} from "uuid";
import { db } from '../firebase/firebase'
// ADD EXPENSE - action generator function
// Remember, () must surround an implicitly returned object
// The arg passed in will be the expense object
// We set a default for the arg passed in of {}
// For each property we destructure, we set its default
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
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

// returns a function (thunk required)
// ask firebase to save data.  When complete, we can use dispatch to dispatch the action to update our store
// thus keeping the store in synch with the firebase database
// Default expenseData to an empty array
export const startAddExpense = (expenseData = {}) => {
    // This is our thunk function - see https://redux.js.org/tutorials/fundamentals/part-6-async-logic
    return (dispatch) => {
        // set defaults for the properties from expenseData
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        // create a const for the values we want to push
        const expense = { description, note, amount, createdAt }
        console.log("PUSHING IN THUNK")
        db.ref('expenses').push(expense)
            .then((result) => {
                dispatch(addExpense(
                    {
                        id: result.key,
                        ...expense
                    }
                ))
            })

    }
}