import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import sampleExpenses from "../resources/expenses";
import ExpenseForm from "../../components/ExpenseForm";

describe("EditExpensePage tests", () => {
  let addExpense, editExpense, removeExpense, history, wrapper;

  beforeEach(() => {
    addExpense = jest.fn();
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    // Now render the component passing in our spies
    wrapper = shallow(
      <EditExpensePage
        addExpense={addExpense}
        editExpense={editExpense}
        removeExpense={removeExpense}
        history={history}
        expense={sampleExpenses[0]}
      />
    );
  });

  describe("Rendering initial page", () => {
    /*
    The EditExpensePage uses functions from the props:
    - this.props.addExpense()
    - this.props.editExpense()
    - this.props.removeExpense
    - this.props.history.push()   (Remember, history is always available in the props)
    We set up spies for these
     */

    it("Should render EditExpensePage correctly", () => {
      // Take a snapshot
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe("Edit and Add Expense", () => {
    it("Should handle onSubmit correctly for an expense that has an id", () => {
      // find the onSubmit property of the ExpenseForm element.
      // It's a function, so let's invoke it with a sample expense.
      const expense = { ...sampleExpenses[0] };
      wrapper.find("ExpenseForm").prop("onSubmit")(expense);
      expect(history.push).toHaveBeenLastCalledWith("/");
      expect(editExpense).toHaveBeenLastCalledWith(expense);
    });

    it("Should handle onSubmit correctly for an expense that does not have an id", () => {
      // find the onSubmit property of the ExpenseForm element.
      // It's a function, so let's invoke it with a sample expense where we've zapped the id.
      const expense = { ...sampleExpenses[0], id: undefined };
      wrapper.find("ExpenseForm").prop("onSubmit")(expense);
      expect(history.push).toHaveBeenLastCalledWith("/");
      expect(addExpense).toHaveBeenLastCalledWith(expense);
    });
  });

  describe("Button onClick", () => {
    it("Should remove an expense", () => {
      const expense = sampleExpenses[0];
      wrapper.find("button").prop("onClick")(expense);
      expect(history.push).toHaveBeenLastCalledWith("/");
      expect(removeExpense).toHaveBeenLastCalledWith(expense);
    });
  });
});
