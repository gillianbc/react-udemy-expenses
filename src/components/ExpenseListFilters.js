import React from 'react';
import {connect} from "react-redux";

const ExpenseListFilters = ( props ) => (
    <div>
        <input type="text" value={props.filters.text}/>
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