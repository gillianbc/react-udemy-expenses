import { createStore, combineReducers} from "redux";
import { v4 as uuid  } from 'uuid';

// ADD EXPENSE - action generator function
// Remember, () must surround an implicitly returned object
// The arg passed in will be the expense object
// We set a default for the arg passed in of {}
// For each property we destructure, we set its default
const addExpense = ( { description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid,
        description,
        note,
        amount,
        createdAt
    }
})

const expensesReducerDefaultState = [];

//  ======  Reducer for expenses
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            console.log('Adding expense ', action.expense)
            return state.concat(action.expense)
        default:
            return state;
    }
}

const filtersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

// Set up a store for the state
// const store = createStore(expensesReducer);
// Now we set up a store with where we combine reducers by passing in an object which has a reducer property for each of
// our root elements that we will need to process.  We have expenses on the root of our demoState object.  We'll do a
// reducer for filters in a mo
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(() => {
    console.log('Current state is ', store.getState());
    console.log(store.getState().expenses)
})

store.dispatch(addExpense( { description: 'Rent February', note: 'Paid late', amount: 60000}));

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