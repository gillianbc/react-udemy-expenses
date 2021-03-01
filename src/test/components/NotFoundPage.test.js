import React from 'react'
import { shallow } from 'enzyme'
import NotFoundPage from "../../components/NotFoundPage";
/*
* Tests the snapshot of the NotFoundPage component
* */

it('The snapshot should match when there is expense data', () => {
    // Remember, these curlies are not object brackets, they're JSX brackets
    const wrapper = shallow(<NotFoundPage />);
    expect(wrapper).toMatchSnapshot();
})



