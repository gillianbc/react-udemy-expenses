import React from 'react';
import {connect} from "react-redux";
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from "../actions/filters";
import { DateRangePicker } from 'react-dates'
class ExpenseListFilters extends React.Component {
    // We don't need a constructor to define the state due to the plugin we're using (babel-plugin-transform-class-properties).
    // Without the plugin, you have to do it the first way since state must be set up in the constructor.
    state = {
        calendarFocused: null
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate({ startDate }))
        this.props.dispatch(setEndDate({ endDate }))
    };
    onFocusChange = ( focusedInput ) => {
        this.state.calendarFocused = focusedInput
    };
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
                <div>
                    <DateRangePicker>
                        startDate={this.props.startDate}
                        endDate={this.props.endDate}
                        onDatesChange={ this.onDatesChange }
                        focusedInput={ this.state.calendarFocused }
                        onFocusChange={ this.onFocusChange }
                        startDateId="start"
                        endDateId="end"
                    </DateRangePicker>
                </div>
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