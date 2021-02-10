
// This is effectively the schema for the expenses.
const expensesReducerDefaultState = [];

//  ======  Reducer for expenses
// So state here is the array of expenses, not the whole application state
// I would have named it expenses, but the tutor didn't, so maybe that's the convention
// The state defaults to an empty array
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // returns a new array made from all the rows currently in the array plus the new row from the payload
            console.log('Adding expense ', action.expense)
            return [...state, action.expense ]    // alternatively, we could return state.concat(action.expense)
        case 'REMOVE_EXPENSE':
            // returns a new array consisting of all the rows currently in the array excluding the one to be removed
            console.log('Removing expense ', action.id)
            return state.filter(({id}) =>  id !== action.id )
        case 'EDIT_EXPENSE':
            // returns a new array consisting of a all the current rows of the array but for the row that is being updated,
            // the row consists of the current data for that row but one or more of its properties are overwritten by the values
            // passed in the payload
            console.log('Editing expense', action.id, action.updateData)
            return state.map((expense) => {
                if (expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updateData
                    }
                } else {
                    return expense;
                }
            })
        default:
            // If an action.type not recognised, just return the array as is
            return state;
    }
}

export default expensesReducer;