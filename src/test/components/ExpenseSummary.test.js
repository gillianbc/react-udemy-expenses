import React from 'react'
import { ExpenseSummary } from '../../components/ExpenseSummary'
import { shallow } from 'enzyme'
/*
* Tests the snapshot of the ExpenseSummary component
* */

it('The snapshot should match when values are passed', () => {
    // Remember, these curlies are not object brackets, they're JSX brackets
    const wrapper = shallow(<ExpenseSummary expenseCount={ 3525 } totalAmount = { 172818 }/>);
    expect(wrapper).toMatchSnapshot();
})


