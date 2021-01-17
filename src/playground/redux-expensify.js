import { createStore, combineReducers} from "redux";

const expensesReducerDefaultState = [];

//  ======  Reducer for expenses
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
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