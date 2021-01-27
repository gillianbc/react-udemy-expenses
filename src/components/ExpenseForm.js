import React, {Component} from 'react';

class ExpenseForm extends Component {
    onChangeDescription = (e) => {
        const description  = e.target.value
        // Andrew used a function, but it doesn't seem necessary
        // this.setState( () => ({ description }))
        this.setState({ description })
    }
    state = {
        description: ''
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
                        type="number"
                        placeholder="Amount"
                    />
                    <textarea placeholder="Enter an optional note for the expense"/>
                    <button >Add Expense</button>

                </form>
            </div>
        );
    }
}

export default ExpenseForm;