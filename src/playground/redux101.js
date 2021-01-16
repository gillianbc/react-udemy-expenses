import { createStore} from "redux";

//An action generator - i.e. a function that will return an action object
//Remember, we need the () when we're implicitly returning the response and the response is an object
//payload = {} - we must set a default for the arg.  If we try to destructure it and it's undefined, we'll get an error.
//Destructuring an empty object {} is fine
const incrementCount = (payload = {}) => ({
    type: 'INCREMENT',
    incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
})

// The first arg is the state and we give it an default value;  in this case an object { count: 0 }
// The second arg is the action and needs no default
// The action arg must have a type property but can have any other properties you want
const myState = (state = {count: 0 }, action) => {
    switch (action.type){
        case 'INCREMENT':
            return { count: state.count + action.incrementBy};
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return { count: state.count - decrementBy};
        case 'DOUBLE': return { count: state.count * 2};
        case 'SQUARE': return { count: state.count * state.count};
        case 'SET': return { count: action.count};
        case 'RESET': return { count: 0};
        default: return state;
    }
}
// We have to pass a function into createStore and the function is immediately invoked
// Do NOT mutate the state.  Return a new object that represents the updated state
const store = createStore( myState );

// subscribe() is invoked every time the store changes
// subscribe() returns a function that lets you unsubscribe

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

// We use the action generator function
store.dispatch(incrementCount({ incrementBy: 12 }))
// store.dispatch({ type: 'INCREMENT', incrementBy: 'apple' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'DECREMENT', decrementBy: 50 })
// store.dispatch({ type: 'DECREMENT', decrementBy: 'apple' })
// store.dispatch({ type: 'DECREMENT' })
// store.dispatch({ type: 'DOUBLE' })
// store.dispatch({ type: 'SET', count: 101 })
// unsubscribe();
// store.dispatch({ type: 'SQUARE' })
// store.dispatch({ type: 'RESET' })

console.log('All done')