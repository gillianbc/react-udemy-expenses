import React from 'react'
import { ExpenseList } from '../../components/ExpenseList'
import { shallow } from 'enzyme'
import testExpenseData from '../resources/expenses'
/*
* Tests the snapshot of the ExpenseList component
* */

it('The snapshot should match', () => {
    // Remember, these curlies are not object brackets, they're JSX brackets
    const wrapper = shallow(<ExpenseList expenses={ testExpenseData }/>);
    expect(wrapper).toMatchSnapshot();
})