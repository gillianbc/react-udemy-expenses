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

/*
  In this test, we simulate someone clicking submit when no data has been entered. The error should be displayed:
  {this.state.error && <p>{this.state.error}</p>}
  We create a wrapper as usual.  We then use find to get the one and only form element.
  See https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/find.html
  We simulate an onClick event - see https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/simulate.html
  (I think the word 'click' equates to onClick, just like 'submit' would equate to 'onSubmit')
  Note that in our actual form, we pass in object e and then call e.preventDefault(); to suppress full-page refresh
  In our test, we need to stub this by passing in a dummy object that has a dummy preventDefault() method
  Our expect just checks that state.error has a length > 0 (by default we set it to '')
  For good measure, we take a snapshot before the error is displayed and a snapshot after
 */
test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', { preventDefault: () => { }});
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});