import React from 'react';
import {connect} from "react-redux";
import {setTextFilter, sortByAmount, sortByDate} from "../actions/filters";
class ExpenseListFilters extends React.Component {
    render(){
        return (<div>
            <input type="text" value={this.props.filters.text} onChange={ (e) => {
                this.props.dispatch(setTextFilter(e.target.value))
            }}/>
            <div>
                <select
                    value={this.props.filters.sortBy}
                    onChange={ (e) => {
                        e.target.value === "date" ? this.props.dispatch(sortByDate()) : this.props.dispatch(sortByAmount())
                    }}>
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
            </div>

        </div>)
    }
}

// Grab data from the connected state and put it in the props
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

const ConnectedExpenseListFilters = connect(mapStateToProps)(ExpenseListFilters)

export default ConnectedExpenseListFilters