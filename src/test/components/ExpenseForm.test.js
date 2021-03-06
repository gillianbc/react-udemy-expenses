import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from "../../components/ExpenseForm";
import sampleExpenses from '../resources/expenses'

describe('ExpenseForm tests', () => {

    describe('Rendering initial page', () => {
        it('should render expense form with default values if we pass it no expense', () => {
            const wrapper = shallow(<ExpenseForm/>)
            expect(wrapper).toMatchSnapshot();
        })

        it('should render expense form if we pass it all the fields from a sample expense', () => {
            const wrapper = shallow(<ExpenseForm expense={sampleExpenses[0]}/>)
            expect(wrapper.state('error').length).toBe(0);
            expect(wrapper).toMatchSnapshot();
        })
    })

    describe('onChangeDescription', () => {
        it('should set the description in the state when something is entered into the first input field ' +
            '(input field with index 0)', () => {
            const wrapper = shallow(<ExpenseForm />);
            const testDescription = 'bananas and cheese';
            wrapper.find('input').at(0)
                .simulate('change', { target: { value: testDescription }});
            expect(wrapper.state('description')).toBe(testDescription);
        });

    })

    describe('onChangeNote', () => {
        it('should set the note in the state when something is entered into the only text area field ', () => {
            const wrapper = shallow(<ExpenseForm />);
            const testNote = 'bananas and cheese and marmite';
            wrapper.find('textarea')
                .simulate('change', { target: { value: testNote }});
            expect(wrapper.state('note')).toBe(testNote);
        });
    })

    describe('onChangeDate', () => {

    })

    describe('onChangeCalendarFocus', () => {

    })

    describe('onSubmit', () => {
        describe('Submit Event - Errors', () => {
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
            it('should render error for invalid form submission - neither amount nor description', () => {
                const wrapper = shallow(<ExpenseForm />);
                expect(wrapper).toMatchSnapshot();
                wrapper.find('form').simulate('submit', { preventDefault: () => { }});
                expect(wrapper.state('error').length).toBeGreaterThan(0);
                expect(wrapper.state('error')).toBe('Please provide description and amount.');
                expect(wrapper).toMatchSnapshot();
            });

            it('should render error for invalid form submission - only description missing', () => {
                const wrapper = shallow(<ExpenseForm expense={{amount: 123}}/>);
                expect(wrapper).toMatchSnapshot();
                wrapper.find('form').simulate('submit', { preventDefault: () => { }});
                expect(wrapper.state('error').length).toBeGreaterThan(0);
                expect(wrapper).toMatchSnapshot();
            });

            it('should render error for invalid form submission - only amount missing', () => {
                const wrapper = shallow(<ExpenseForm expense={{description: 'bed'}}/>);
                expect(wrapper).toMatchSnapshot();
                wrapper.find('form').simulate('submit', { preventDefault: () => { }});
                expect(wrapper.state('error').length).toBeGreaterThan(0);
                expect(wrapper).toMatchSnapshot();
            });
        })

        describe('TODO - Submit Event - Valid', () => {
            it('should submit a valid expense', () => {
                const onSubmit= (expense) =>  console.log(expense) ;
                const wrapper = shallow(<ExpenseForm includedProp={onSubmit} expense={sampleExpenses[0]}/>)

                wrapper.find('form').simulate('submit',
                    {
                        preventDefault: () => { },
                    });
                expect(wrapper.state('error').length).toBe(0);
            });

        })
    })

})


