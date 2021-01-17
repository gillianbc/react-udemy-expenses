import { createStore} from "redux";

//An action generator - i.e. a function that will return an action object
//Remember, we need the () when we're implicitly returning the response and the response is an object
//payload = {} - we must set a default for the arg.  If we try to destructure it and it's undefined, we'll get an error.
//Destructuring an empty object {} is fine
const incrementCount = ({ incrementBy = 1 }) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({ decrementBy = 1 }) => ({
    type: 'DECREMENT',
    decrementBy
})

const reset = () => ({
    type: 'RESET'
})

// The arg doesn't have to be an object.  Objects are useful if we need to pass in multiple properties of action, but
// a single variable works just fine too
const set = (count) => ({
    type: 'SET',
    count
})

// The first arg is the state and we give it an default value;  in this case an object { count: 0 }
// The second arg is the action and needs no default
// The action arg must have a type property but can have any other properties you want
const countReducer = (state = {count: 0 }, action) => {
    switch (action.type){
        case 'INCREMENT':
            return { count: state.count + action.incrementBy};
        case 'DECREMENT':
            return { count: state.count - action.decrementBy};
        case 'DOUBLE': return { count: state.count * 2};
        case 'SQUARE': return { count: state.count * state.count};
        case 'SET': return { count: action.count};
        case 'RESET': return { count: 0};
        default: return state;
    }
}
// We have to pass a function into createStore and the function is immediately invoked
// Do NOT mutate the state.  Return a new object that represents the updated state
const store = createStore( countReducer );

// subscribe() is invoked every time the store changes
// subscribe() returns a function that lets you unsubscribe

// We use the action generator function
store.dispatch(incrementCount({ incrementBy: 12 }))
store.dispatch(incrementCount({ incrementBy: 12 }))
store.dispatch(decrementCount({ decrementBy: 3 }))
store.dispatch({ type: 'SQUARE' })
store.dispatch({ type: 'DOUBLE' })
store.dispatch(set(103))
store.dispatch(reset())
console.log('All done')