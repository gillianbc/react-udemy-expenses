import React from 'react'
import { ExpenseList } from '../../components/ExpenseList'
import { shallow } from 'enzyme'
import testExpenseData from '../resources/expenses'
/*
* Tests the snapshot of the ExpenseList component
* */

it('The snapshot should match when there is an array of expenses', () => {
    // Remember, these curlies are not object brackets, they're JSX brackets
    const wrapper = shallow(<ExpenseList expenses={ testExpenseData }/>);
    expect(wrapper).toMatchSnapshot();
})

it('The snapshot should match when there is an empty array of expenses', () => {
    // Remember, these curlies are not object brackets, they're JSX brackets
    const wrapper = shallow(<ExpenseList expenses={ [] }/>);
    expect(wrapper).toMatchSnapshot();
})

