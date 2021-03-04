import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from "../../components/ExpenseForm";
import sampleExpenses from '../resources/expenses'

test('should render expense form with default values if we pass it no expense', () => {
    const wrapper = shallow(<ExpenseForm/>)
    expect(wrapper).toMatchSnapshot();
})

test('should render expense form with default values if we pass it all the fields from a sample expense', () => {
    const wrapper = shallow(<ExpenseForm expense={sampleExpenses[0]}/>)
    expect(wrapper).toMatchSnapshot();
})