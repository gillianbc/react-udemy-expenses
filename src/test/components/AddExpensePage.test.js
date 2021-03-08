import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import sampleExpenses from "../resources/expenses";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";

describe("AddExpensePage tests", () => {
  describe("Rendering initial page", () => {
    /*
    The AddExpensePage uses two functions from the props:
    - this.props.saveExpense()
    - this.props.history.push()
    We set up spies for these
     */
    it("Should render AddExpensePage correctly", () => {
      const saveExpense = jest.fn();
      const history = { push: jest.fn() };
      // Now render the component passing in our two spies
      const wrapper = shallow(
        <AddExpensePage saveExpense={saveExpense} history={history} />
      );
      // Take a snapshot
      expect(wrapper).toMatchSnapshot();
    });
  });
});
