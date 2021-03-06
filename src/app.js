import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./routers/AppRouter";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { getVisibleExpenses, getAllExpenses } from "./selectors/expenses";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import './firebase/firebase'

if (process.env.NODE_ENV !== "production") {
  console.log("************* Looks like we are in DEVELOPMENT mode!");
}

const visibleExpenses = () => {
  const state = store.getState();
  return getVisibleExpenses(state.expenses, state.filters);
};

const allExpenses = () => {
  const state = store.getState();
  return getAllExpenses(state.expenses, state.filters);
};

const addSampleData = () => {
    store.dispatch(
        addExpense({
            description: "Gas bill",
            note: "Paid late",
            amount: 12200,
            createdAt: moment().add(-3, 'days').valueOf(),
        })
    );
    store.dispatch(
        addExpense({
            description: "Water bill",
            note: "Paid late",
            amount: 999,
            createdAt: moment().add(-1, 'days').valueOf(),
        })
    );
    store.dispatch(
        addExpense({
            description: "Phone bill",
            note: "Paid late",
            amount: 75200,
            createdAt: moment().add(-2, 'days').valueOf(),
        })
    );
    store.dispatch(
        addExpense({
            description: "Mortgage",
            note: "Paid on time",
            amount: 25400,
            createdAt: moment().add(0, 'days').valueOf(),
        })
    );
}

// addSampleData();
store.dispatch(setTextFilter("gas"));

setTimeout(() => {
  store.dispatch(setTextFilter("water"));
}, 2000);

setTimeout(() => {
  store.dispatch(setTextFilter(""));
}, 6000);

// console.log(visibleExpenses())
// console.log(allExpenses())



const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

// What we want to render and where do we want it displayed
// React identifies components as those that have an uppercase initial letter - lowercase it assumes are just html
ReactDOM.render(jsx, document.getElementById("app"));
