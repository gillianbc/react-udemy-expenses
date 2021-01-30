import React, {Component} from 'react';
import moment from "moment";
import {SingleDatePicker} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

const now = moment();
console.log('Date is ', now.format('dddd Do of MMMM DD-MMM-YYYY'))

moment.locale('en_GB');

class ExpenseForm extends Component {
    onChangeDescription = (e) => {
        const description  = e.target.value
        // Andrew uses a function for all set state operations - read this for why https://www.freecodecamp.org/news/functional-setstate-is-the-future-of-react-374f30401b6b/
        this.setState( () => ({ description }))
        // Passing an object like so will work, but don't do it
        // this.setState({ description })
    }
    onChangeNote = (e) => {
        const note  = e.target.value
        this.setState(() => ({ note }))
    }
    onChangeAmount = (e) => {
        //   /^\d*(\.\d{0,2})?$
        const amount = e.target.value
        if (amount.match(/^\d*(\.\d{0,2})?$/)){
            this.setState(() => ({ amount }))
        }
    }
    onChangeDate = (createdAt) => {
        this.setState(() => ({createdAt}))
    }
    onChangeCalendarFocus = ({focused}) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    state = {
        description: '',
        note: '',
        amount: '0.00',
        createdAt: moment(),
        calendarFocused: false
    }
    render() {
        return (
            <div>
                <form>
                    <input
                        type="text"
                        placeholder="Description"
                        autoFocus
                        value = {this.state.description}
                        onChange = {this.onChangeDescription}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value = {this.state.amount}
                        onChange = {this.onChangeAmount}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onChangeDate}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onChangeCalendarFocus}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea
                        placeholder="Enter an optional note for the expense"
                        value = {this.state.note}
                        onChange = {this.onChangeNote}
                    />
                    <button >Add Expense</button>

                </form>
            </div>
        );
    }
}

export default ExpenseForm;