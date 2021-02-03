// Stateless functional component
import React from "react";
import {connect} from 'react-redux';

const EditExpensePage = (props) => {
  console.log('Edit expense page', props)
  return <div>Editing the expense with id {props.match.params.id}</div>
}

// We need to pass the id in from out class's props and get an expense object out of the store (aka the global state)
// If we then examine the props coming in, we will see that it has then been populated with the expense from the state
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) =>  expense.id === props.match.params.id )
  }
}

// connect to the store
export default connect(mapStateToProps)(EditExpensePage)