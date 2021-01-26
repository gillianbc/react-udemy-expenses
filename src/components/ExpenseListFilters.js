import React from 'react';
import {connect} from "react-redux";
import {setTextFilter, sortByAmount, sortByDate} from "../actions/filters";
// These are what's known as a 'controlled input'
// The value is read from the state and we use JS to update the state
const ExpenseListFilters = ( props ) => (
    <div>
        <input type="text" value={props.filters.text} onChange={ (e) => {
            props.dispatch(setTextFilter(e.target.value))
        }}/>
        <div>
            <select
                value={props.filters.sortBy}
                onChange={ (e) => {
                    e.target.value === "date" ? props.dispatch(sortByDate()) : props.dispatch(sortByAmount())
                }}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
            </select>
        </div>

    </div>
)

// Grab data from the connected state and put it in the props
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

const ConnectedExpenseListFilters = connect(mapStateToProps)(ExpenseListFilters)

export default ConnectedExpenseListFilters