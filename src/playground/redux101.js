import { createStore} from "redux";

// The first arg is the state and we give it an default value;  in this case an object { count: 0 }
// The second arg is the action and needs no default
const myState = (state = {count: 0 }, action) => {
    switch (action.type){
        case 'INCREMENT': return { count: state.count + 1};
        case 'DOUBLE': return { count: state.count * 2};
        case 'SQUARE': return { count: state.count * state.count};
        case 'RESET': return { count: 0};
        default: return state;
    }
}
// We have to pass a function into createStore and the function is immediately invoked
// Do NOT mutate the state.  Return a new object that represents the updated state
const store = createStore( myState );

store.dispatch({ type: 'INCREMENT' })
console.log(store.getState())
store.dispatch({ type: 'DOUBLE' })
console.log(store.getState())
store.dispatch({ type: 'SQUARE' })
console.log(store.getState())
store.dispatch({ type: 'RESET' })
console.log(store.getState())