import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import moment from "moment";

describe("ExpenseListFilters tests", () => {
  let onDatesChange, onFocusChange, onTextChange, onSortChange, wrapper;

  beforeEach(() => {
    onDatesChange = jest.fn();
    onFocusChange = jest.fn();
    onTextChange = jest.fn();
    onSortChange = jest.fn();
    // Now render the component passing in our spies as props
    wrapper = shallow(
      <ExpenseListFilters
        onDatesChange={onDatesChange}
        onFocusChange={onFocusChange}
        onTextChange={onTextChange}
        onSortChange={onSortChange}
        filters={{
          text: "banana",
          startDate: moment().startOf("month"),
          endDate: moment().startOf("month"),
          sortBy: "amount",
        }}
      />
    );
  });

  describe("Rendering initial page", () => {
    it("Should render ExpenseListFilters correctly", () => {
      /*
    The ExpenseListFilters uses functions from the props:
    - this.props.onDatesChange()
    - this.props.onFocusChange()
    - this.props.onTextChange()
    - this.props.onSortChange
    We set up spies for these
     */

      // Take a snapshot
      expect(wrapper).toMatchSnapshot();
    });
  });
});
