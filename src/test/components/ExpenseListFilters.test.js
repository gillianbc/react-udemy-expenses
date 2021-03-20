import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import moment from "moment";

/*
How this works:
We refactored the ExpenseList filter to a React class component.
The component has several functions.
These component functions use methods passed in via the props when the component is instantiated.
The connected component uses mapDispatchToProps to provide real dispatch methods in the props
In the real app, we use the connected component (the default export).
For test purposes, we use the unconnected component - a named export - and simply pass it some spies in the props
The events on the rendered fields call
 */
describe("ExpenseListFilters tests", () => {
  let setStartDate,
    setEndDate,
    setTextFilter,
    sortByDate,
    sortByAmount,
    wrapper;
  beforeEach(() => {
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    // Now render the component passing in our spies as props
    wrapper = shallow(
      <ExpenseListFilters
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        filters={{
          text: "banana",
          startDate: moment().startOf("month"),
          endDate: moment().startOf("month"),
          sortBy: "amount",
        }}
      />
    );
  });
  it("Should render ExpenseListFilters correctly", () => {
    /*
    The ExpenseListFilters uses functions from the props:
    - this.props.setStartDate()
    - this.props.setEndDate()
    - this.props.onTextChange()
    - this.props.onSortChange
    We set up spies for these
     */

    // Take a snapshot
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render ExpenseListFilters correctly again with different values", () => {
    wrapper.setProps({
      filters: {
        text: "bill",
        startDate: moment().startOf("month"),
        endDate: moment().startOf("month"),
        sortBy: "date",
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("the onchange event of the input should call setTextFilter('hubblebubble')", () => {
    // Find the input element in the rendered page
    // Invoke its onChange event
    // It expects an event that has a target property with a value property i.e. e.target.value
    // It calls setTextFilter("hubblebubble")
    wrapper
      .find("input")
      .simulate("change", { target: { value: "hubblebubble" } });
    expect(setTextFilter).toHaveBeenLastCalledWith("hubblebubble");
  });

  /*
  <select value={this.props.filters.sortBy} onChange={this.onSortChange}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
   */
  it("the onchange event of the select call sortByDate()", () => {
    // Find the select element in the rendered page
    // Invoke its onChange event
    // It expects an event that has a target property with a value property
    // It calls sortByDate()
    wrapper.find("select").simulate("change", { target: { value: "date" } });
    expect(sortByDate).toHaveBeenCalled();
  });

  it("the onchange event of the select should call sortByAmount()", () => {
    // Find the select element in the rendered page
    // Invoke its onChange event
    // It expects an event that has a target property with a value property
    // It calls sortByAmount()
    wrapper.find("select").simulate("change", { target: { value: "amount" } });
    expect(sortByAmount).toHaveBeenCalled();
  });

  it("the onDatesChange event of the daterangepicker should call setStartDate(startDate) and setEndDate(endDate)", () => {
    // Find the DateRangePicker element in the rendered page
    // It has a prop that is a function called onDatesChange
    // Call the date picker's onDatesChange() function with a start and end date
    // the date picker's onDatesChange() will call a component function, which happens to have the same name - onDatesChange
    // Component function onDatesChange() calls setStartDate(startDate) and setEndDate(endDate
    const startDate = 1;
    const endDate = 2;
    wrapper.find("DateRangePicker").prop("onDatesChange")({
      startDate,
      endDate,
    });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
  });

  it("the onFocusChange event of the daterangepicker set the focus to the endDate", () => {
    // Find the DateRangePicker element in the rendered page
    // It has a prop that is a function called onFocusChange
    // Call the date picker's onFocusChange() function with the name of the endDate field
    // the date picker's onFocusChange() will call a component function, which happens to have the same name - onFocusChange
    // Component function onFocusChange() will set the calendarFocussed state to the endDate field
    const calendarFocused = "endDate";
    wrapper.find("DateRangePicker").prop("onFocusChange")(calendarFocused);
    expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
  });
});
