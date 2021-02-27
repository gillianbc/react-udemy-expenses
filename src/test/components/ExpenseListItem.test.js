import React from 'react'
import ExpenseListItem from '../../components/ExpenseListItem'
import { shallow } from 'enzyme'
import testExpenseData from '../resources/expenses'
import toJson from 'enzyme-to-json'
/*
* Tests the snapshot of the ExpenseListItem component
* */

// { id, amount, description, createdAt }
it('The snapshot should match when there is expense data', () => {
    // Remember, these curlies are not object brackets, they're JSX brackets
    const wrapper = shallow(<ExpenseListItem key={123} { ...testExpenseData[2]}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
})


