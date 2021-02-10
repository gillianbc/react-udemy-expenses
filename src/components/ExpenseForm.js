import React, {Component} from 'react';
import moment from "moment";
import {SingleDatePicker} from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

const now = moment();
console.log('Date is ', now.format('dddd Do of MMMM DD-MMM-YYYY'))

moment.locale('en_GB');

class ExpenseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.expense ? props.expense.id : undefined,
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount/100).toString() : '0.00',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: false
        }
    }
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
        //   ^\d*(\.\d{0,2})?$/)
        const amount = e.target.value
        if (!amount || amount.match(/^\d\d*(\.\d{0,2})?$/)){
            this.setState(() => ({ amount }))
        }
    }
    onChangeDate = (createdAt) => {
        createdAt && this.setState(() => ({createdAt}))
    }
    onChangeCalendarFocus = ({focused}) => {
        this.setState(() => ({ calendarFocused: focused }))
    }
    onSubmit = (e) => {
        e.preventDefault();  // suppress full-page refresh
        if (!this.state.description || !this.state.amount){
            this.setState(() => ({ error: true}))
        } else {
            this.setState(() => ({ error: false}))
            this.props.onSubmit({
                id: this.state.id,
                description: this.state.description,
                note: this.state.note,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf()
            })
            console.log('Submitted')
        }

    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    { this.state.error && (<p className="oops">Please enter an amount and a description</p>) }
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
                    {/* By default, the button is a submit button */}
                    <button >{(this.props.expense && this.props.expense.id) ? "Edit" : "Add"} Expense</button>

                </form>
            </div>
        );
    }
}

export default ExpenseForm;