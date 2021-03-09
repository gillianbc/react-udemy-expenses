import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import sampleExpenses from "../resources/expenses";
import ExpenseForm from "../../components/ExpenseForm";

describe("AddExpensePage tests", () => {
  describe("Rendering initial page", () => {
    /*
    The AddExpensePage uses two functions from the props:
    - this.props.saveExpense()
    - this.props.history.push()
    We set up spies for these
     */

    let saveExpense, history, wrapper;

    beforeEach(() => {
      saveExpense = jest.fn();
      history = { push: jest.fn() };
      // Now render the component passing in our two spies
      wrapper = shallow(
        <AddExpensePage saveExpense={saveExpense} history={history} />
      );
    });
    it("Should render AddExpensePage correctly", () => {
      // Take a snapshot
      expect(wrapper).toMatchSnapshot();
    });

    it("Should handle onSubmit correctly", () => {
      wrapper.find("ExpenseForm").prop("onSubmit")(sampleExpenses[0]);
      expect(history.push).toHaveBeenLastCalledWith("/");
      expect(saveExpense).toHaveBeenLastCalledWith(sampleExpenses[0]);
    });
  });
});
