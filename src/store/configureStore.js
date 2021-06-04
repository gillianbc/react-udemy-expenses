import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import thunk from 'redux-thunk';  // allows dispatch of functions

//because we're using devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
)

export default store