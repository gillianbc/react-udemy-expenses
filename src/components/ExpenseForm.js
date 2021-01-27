import React, {Component} from 'react';

class ExpenseForm extends Component {
    onChangeDescription = (e) => {
        const description  = e.target.value
        // Andrew used a function - read this for why https://www.freecodecamp.org/news/functional-setstate-is-the-future-of-react-374f30401b6b/
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
    state = {
        description: '',
        note: '',
        amount: '0.00'
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