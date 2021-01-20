
// This is effectively the schema for the expenses.
const expensesReducerDefaultState = [];

//  ======  Reducer for expenses
// So state here is the array of expenses, not the whole application state
// I would have named it expenses, but the tutor didn't, so maybe that's the convention
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            console.log('Adding expense ', action.expense)
            return [...state, action.expense ]    // alternatively, we could return state.concat(action.expense)
        case 'REMOVE_EXPENSE':
            console.log('Removing expense ', action.id)
            return state.filter(({id}) =>  id !== action.id )
        case 'EDIT_EXPENSE':
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
            return state;
    }
}

export default expensesReducer;