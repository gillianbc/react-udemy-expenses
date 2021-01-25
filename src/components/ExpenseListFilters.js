import React from 'react';
import {connect} from "react-redux";
import {setTextFilter} from "../actions/filters";

const ExpenseListFilters = ( props ) => (
    <div>
        <input type="text" value={props.filters.text} onChange={ (e) => {
            props.dispatch(setTextFilter(e.target.value))
        }}/>
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