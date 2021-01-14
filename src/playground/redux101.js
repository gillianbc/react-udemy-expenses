import { createStore} from "redux";

const myState = (state = {count: 0 }) => {
    return state;
}
// We have to pass a function into createStore and the function is immediately invoked
const store = createStore( myState );

console.log(store.getState())