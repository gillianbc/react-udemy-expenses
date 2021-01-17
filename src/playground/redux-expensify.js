import { createStore, combineReducers} from "redux";

const expensesReducerDefaultState = [];

// Set up a reducer for expenses
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

//Set up a store for the state
const store = createStore(expensesReducer);

console.log('Current state is ', store.getState());

const demoState = {
    expenses: [
        {
            id: 'shfkah',
            description: 'Rent for Jan',
            note: 'Paid on time',
            amount: 54500,
            createdAt: 0
        }
    ],
    filters: {
        text: 'Rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
}