import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import sampleExpenses from "../resources/expenses";
import ExpenseForm from "../../components/ExpenseForm";

describe("AddExpensePage tests", () => {
  describe("Rendering initial page", () => {
    /*
    The AddExpensePage uses two functions from the props:
    - this.props.addExpense()
    - this.props.history.push()
    We set up spies for these
     */

    let addExpense, history, wrapper;

    beforeEach(() => {
      addExpense = jest.fn();
      history = { push: jest.fn() };
      // Now render the component passing in our two spies
      wrapper = shallow(
        <AddExpensePage addExpense={addExpense} history={history} />
      );
    });
    it("Should render AddExpensePage correctly", () => {
      // Take a snapshot
      expect(wrapper).toMatchSnapshot();
    });

    it("Should handle onSubmit correctly", () => {
      // find the onSubmit property of the ExpenseForm element.
      // It's a function, so let's invoke it with a sample expense.
      wrapper.find("ExpenseForm").prop("onSubmit")(sampleExpenses[0]);
      expect(history.push).toHaveBeenLastCalledWith("/");
      expect(addExpense).toHaveBeenLastCalledWith(sampleExpenses[0]);
    });
  });
});
