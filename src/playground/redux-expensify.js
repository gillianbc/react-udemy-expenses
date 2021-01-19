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

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
})

const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
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
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
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

// if a startDate filter is Nan, then valid match on date is set as true
// if the expense createdAt is on or after the startDate filter, it's a match
const getVisibleExpenses = (expenses, { startDate, endDate, text, sortBy}) => {
    console.log('Calculating visible', startDate, endDate, text, sortBy)
    console.log(text.toLowerCase())
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = !text || expense.description.toLowerCase().includes(text.toLowerCase())
        return startDateMatch && endDateMatch && textMatch;
    })
}

store.subscribe(() => {
    const state = store.getState();
    console.log('Current state is ', state);
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log('Visible expenses are: ', visibleExpenses)
})

const expenseOne = store.dispatch(addExpense( { description: 'Rent February', note: 'Paid late', amount: 60000, createdAt: 157}));
const expenseTwo = store.dispatch(addExpense( { description: 'Water Bill February', note: 'Paid on time', amount: 2700, createdAt: 160}));
const expenseThree = store.dispatch(addExpense( { description: 'Rent March', note: 'Paid late', amount: 75200, createdAt: 159}));
const expenseFour = store.dispatch(addExpense( { description: 'Netflix', amount: 799, createdAt: 160}));

store.dispatch(addExpense( { description: 'Rent April', note: 'Paid late', amount: 75200, createdAt: 159}));

store.dispatch(removeExpense( { id: expenseTwo.expense.id}));
store.dispatch(editExpense(expenseOne.expense.id, { amount: 20000}));
store.dispatch(editExpense(expenseThree.expense.id, { description: 'Gas bill', amount: 120000}));
store.dispatch(setTextFilter('Rent'));
store.dispatch(setTextFilter('Bill'));
store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
store.dispatch(setStartDate(125));
store.dispatch(setStartDate(158));
store.dispatch(setEndDate(160));
store.dispatch(setTextFilter('Rent'))


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