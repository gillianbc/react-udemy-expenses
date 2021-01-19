import { createStore, combineReducers} from "redux";
import { v1 as uuid  } from 'uuid';

// ADD EXPENSE - action generator function
// Remember, () must surround an implicitly returned object
// The arg passed in will be the expense object
// We set a default for the arg passed in of {}
// For each property we destructure, we set its default
const addExpense = ( { description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
})

const removeExpense = ( { id }) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const editExpense = (id, updateData ) => ({
    type: 'EDIT_EXPENSE',
    id,
    updateData
})

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

const setTextFilter = (textFilter = '') => ({
    type: 'SET_TEXT_FILTER',
    textFilter
})

// This is effectively the schema for the filters.
const filtersDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.textFilter
            }
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
})

const expenseOne = store.dispatch(addExpense( { description: 'Rent February', note: 'Paid late', amount: 60000}));
const expenseTwo = store.dispatch(addExpense( { description: 'Water Bill February', note: 'Paid on time', amount: 2700}));
const expenseThree = store.dispatch(addExpense( { description: 'Rent March', note: 'Paid late', amount: 75200}));

store.dispatch(removeExpense( { id: expenseTwo.expense.id}));
store.dispatch(editExpense(expenseOne.expense.id, { amount: 20000}));
store.dispatch(editExpense(expenseThree.expense.id, { description: 'Gas bill', amount: 120000}));
store.dispatch(setTextFilter('Rent'));
store.dispatch(setTextFilter('Bill'));
store.dispatch(setTextFilter());


//SCRAP PAPER
const user = {
    name: 'Jen',
    age: 12
}
const user2 = {
    age: 67
}
const person = { ...user, ...user2}
console.log(person)

const demoAppState = {
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