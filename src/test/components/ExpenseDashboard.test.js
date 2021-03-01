import React from 'react'
import { shallow } from 'enzyme'
import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";
/*
* Tests the snapshot of the NotFoundPage component
* */

it('The snapshot should match when there is expense data', () => {
    // Remember, these curlies are not object brackets, they're JSX brackets
    const wrapper = shallow(<ExpenseDashboardPage />);
    expect(wrapper).toMatchSnapshot();
})



